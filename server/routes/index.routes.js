import { Router } from "express";
import { pool } from "../db.js";
import { createUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/login.controllers.js";

const router = Router();

//RUTA PRINCIPAL - lOGIN
router.post("/saveUser", createUser);
router.post("/loginUser", loginUser);

router.get("/ping", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 + 1 AS response");
  console.log(rows);
  res.json("ping");
});

//probando uso de cookies
router.get("/setCookie", (req, res) => {
  res.cookie("miCokkie", "datos de prueba", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3000,
  });
  res.send("cookie estalecida");
});

export default router;
