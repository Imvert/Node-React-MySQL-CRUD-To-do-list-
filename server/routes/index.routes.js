import { Router } from "express";
import { pool } from "../db.js";
import { createUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/login.controllers.js";

const router = Router();

//RUTA PRINCIPAL - lOGIN
router.post("/saveUser", createUser);
router.post("/loginUser", loginUser);

router.get("/prueba", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 + 1 AS response");
  console.log(rows);
  res.send({ msg: "ping from DB" });
});

export default router;
