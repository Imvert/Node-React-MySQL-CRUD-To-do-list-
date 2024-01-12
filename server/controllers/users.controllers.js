import bcrypt from "bcrypt";
import { pool, pgPool } from "../db.js";

export const createUser = async (req, res) => {
  const { name, lastname, username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const result = await pgPool.query(
      "INSERT INTO public.user (name,lastname,username,password) VALUES ($1,$2,$3,$4)",
      [name, lastname, username, passwordHash]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      lastname,
      username,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
