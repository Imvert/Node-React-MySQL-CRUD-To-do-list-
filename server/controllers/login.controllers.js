import bcrypt from "bcrypt";
import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { Secret_key } from "../../config.js";
import { serialize } from "cookie";

export const loginUser = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  try {
    const [user] = await pool.query("SELECT * FROM user WHERE username = ?", [
      username,
    ]);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user[0].password);

    if (!user && passwordCorrect) {
      res.status(401).json({
        error: "invalid user or password",
      });
    }

    const userForToken = {
      id: user[0].id,
      username: user[0].username,
    };
    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, userForToken },
      Secret_key
    );

    const serialized = serialize(token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    res.cookie("cockie_final", serialized);

    // aqui ya no tendria que enviar el token como respuesta json
    res.status(200).json({
      id: user[0].id,
      name: user[0].name,
      username: user[0].username,
      token,
    });
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
};
