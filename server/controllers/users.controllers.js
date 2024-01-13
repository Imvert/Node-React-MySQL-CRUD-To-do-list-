import bcrypt from "bcrypt";
import { pool, pgPool, conection } from "../db.js";

export const createUser = async (req, res) => {
  const { name, lastname, username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = (await conection).query(
      "INSERT INTO user (name,lastname,username,password) VALUES (?,?,?,?)",
      [name, lastname, username, passwordHash]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      lastname,
      username,
    });
    // conection.end();
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
