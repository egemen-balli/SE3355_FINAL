import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "./db";
import multer from "multer";
import path from "path";
import { OAuth2Client } from "google-auth-library";
import { AppUser } from "../shared/user";
import { remult } from "remult";

export const auth = Router();
const client = new OAuth2Client("1063463680190-oi81jpdoivdq48t1orog7v2m4vd1hcsb.apps.googleusercontent.com");

auth.post("/api/google-login", async (req: any, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ message: "No credential" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: "GOOGLE_CLIENT_ID", // buraya da aynısını yaz
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) return res.status(400).json({ message: "No email from Google" });

    const repo = remult.repo(AppUser);
    let user: any = await repo.findOne({ where: { email: payload.email } });

    if (!user) {
      user = await repo.insert({
        email: payload.email,
        name: payload.name || "No Name",
        photo_url: payload.picture,
        google_id: payload.sub
      } as any);
    }

    req.session.userId = user.id;
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google token invalid" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb: any) {
    cb(null, "uploads/");
  },
  filename: function (req, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

auth.post("/api/register", upload.single("photo"), async (req: any, res) => {
  const { email, password, name, country, city } = req.body;
  const photoFile = req.file;

  if (!password.match(/^(?=.*\d)(?=.*\W).{8,}$/)) {
    return res.status(400).json({ message: "Şifre 8+ karakter, sayı ve özel karakter içermeli." });
  }

  const existing = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
  if (existing) return res.status(400).json({ message: "Bu e-posta zaten kayıtlı" });

  const hash = await bcrypt.hash(password, 10);
  const photo_url = photoFile ? `/uploads/${photoFile.filename}` : null;

  const user = await db.one(
    `INSERT INTO users (email, password_hash, name, country, city, photo_url)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, photo_url`,
    [email, hash, name, country, city, photo_url]
  );

  req.session.userId = user.id;
  res.json(user);
});

auth.post("/api/login", async (req: any, res) => {
  const { email, password } = req.body;

  const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: "Geçersiz bilgiler" });
  }

  req.session.userId = user.id;
  res.json({ id: user.id, email: user.email, name: user.name });
});

auth.get("/api/me", async (req, res) => {
  if (!req.session?.userId) return res.status(401).json({ message: "Giriş yapılmamış" });

  const user = await db.oneOrNone(
    "SELECT id, email, name FROM users WHERE id = $1",
    [req.session.userId]
  );
  if (!user) return res.status(401).json({ message: "Kullanıcı bulunamadı" });

  res.json(user);
});

auth.post("/api/logout", (req, res) => {
  req.session = null;
  res.json({ success: true });
});
