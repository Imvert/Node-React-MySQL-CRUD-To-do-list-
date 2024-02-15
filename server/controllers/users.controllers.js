import bcrypt from "bcrypt";
import { pool } from "../db.js";

export const createUser = async (req, res) => {
  const { name, lastname, username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO user (name,lastname,username,password) VALUES (?,?,?,?)",
      [name, lastname, username, passwordHash]
    );
    //extraemos el id que se inserta
    const userId = result[0].insertId;

    res.status(201).json({
      id: userId,
      name,
      lastname,
      username,
    });
  } catch (error) {
    if (error.errno) {
      res.status(400).json({ msg: "Este usuario ya existe" });
    } else {
      res.status(400).json({ msg: error });
    }
  }
};
