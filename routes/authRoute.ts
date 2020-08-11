import express from "express";
const app = express();
import dotenv from "dotenv-safe";
import jwt from "jsonwebtoken";
import dbService from "../src/services/dbService";
dotenv.config();

app.post("/auth", (req, res, next) => {
  const db = new dbService();
  const { username, password, deviceId } = req.body;
  if (db.VerifyUserDevice(username, password, deviceId)) {
    var token = jwt.sign({ deviceId }, process.env.secret || "secret", {
      expiresIn: 300,
    });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: "Login inválido!" });
});

export { app as authRoute };
