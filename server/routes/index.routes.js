import { Router } from "express";
import { pool, pgPool } from "../db.js";
import { createUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/login.controllers.js";
import { DATABASE_URL } from "../../config.js";
import { createConnection } from "mysql2";

const router = Router();

//RUTA PRINCIPAL - lOGIN
router.post("/saveUser", createUser);
router.post("/loginUser", loginUser);

router.get("/ping", async (req, res) => {
  try {
    const conn = createConnection({
      DATABASE_URL,
      rowsAsArray: true,
    });
    const rows = conn.query("SELECT 1 + 1 ");
    // const [rows] = await pool.query("SELECT 1 + 1 AS response");
    console.log(rows);

    res.send({
      msg: "ping from DB",
      msg2: "conexion exitosa a la bd",
    });
    conn.end();
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
