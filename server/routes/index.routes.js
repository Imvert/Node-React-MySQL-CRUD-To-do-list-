import { Router } from "express";
import { pool } from "../db.js";
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

router.get("/pong", async (req, res) => {
  res.send({ msg: "llegastes al endpoint" });
});

router.post("/tables", async (req, res) => {
  try {
    const result = await pool.query(
      "CREATE TABLE user ( id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(50) NOT NULL,lastname VARCHAR(50) NOT NULL,username VARCHAR(20) NOT NULL UNIQUE,password VARCHAR(100) NOT NULL,createAt TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP);"
    );

    console.log(result);
    res.send({ msg: "tablas creadas con exito" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
