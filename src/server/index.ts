import express from "express";
import { api } from "./api";
import session from "cookie-session";
import { auth } from "./auth";
import { watchlistRouter } from "./watchlist";

const app = express();
app.use(express.json());

app.use(session({ secret: "secret" }))
app.use(auth)
app.use(api)
app.use("/uploads", express.static("uploads"));
app.use(watchlistRouter);

app.get("/api/hi", (req, res) => res.send("Hello"));
app.use(express.static(process.cwd()+"/dist"))
app.listen(3002, () => console.log("started"));