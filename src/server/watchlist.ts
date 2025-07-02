import { Router } from "express";
import { db } from "./db";

export const watchlistRouter = Router();

watchlistRouter.post("/api/watchlist", async (req, res) => {
  const userId = req.session?.userId;
  const { movieId } = req.body;

  if (!userId) return res.status(401).json({ message: "Giriş yapılmamış" });
  if (!movieId) return res.status(400).json({ message: "movieId eksik" });

  try {
    await db.none(
      `INSERT INTO watchlist (user_id, movie_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, movie_id) DO NOTHING`,
      [userId, movieId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});
