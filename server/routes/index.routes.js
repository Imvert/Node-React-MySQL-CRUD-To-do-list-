import { Router } from "express";
import { pool, pgPool } from "../db.js";
import { createUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/login.controllers.js";

const router = Router();

//RUTA PRINCIPAL - lOGIN
router.post("/saveUser", createUser);
router.post("/loginUser", loginUser);

router.get("/ping", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS response");
    console.log(rows);
    res.send({ msg: "ping from DB" });
  } catch (error) {
    res.send({ falla: error });
  }
});

router.get("/now", async (req, res) => {
  try {
    const result = await pgPool.query("SELECT NOW()");
    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pong", async (req, res) => {
  res.send({ msg: "llegastes al endpoint" });
});

export default router;
