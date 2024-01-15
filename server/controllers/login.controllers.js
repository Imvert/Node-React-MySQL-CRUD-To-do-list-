import bcrypt from "bcrypt";
import { conection } from "../db.js";
import jwt from "jsonwebtoken";
import { Secret_key } from "../../config.js";

export const loginUser = async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  try {
    const [user] = await (
      await conection
    ).query("SELECT * FROM user WHERE username = ?", [username]);

    const passwordCorrect =
      user.length <= 0
        ? false
        : await bcrypt.compare(password, user[0].password);

    if (!(user && passwordCorrect)) {
      res.status(401).json({
        error: "invalid user or password",
      });

      return;
    }

    const userForToken = {
      id: user[0].id,
      username: user[0].username,
    };
    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, userForToken },
      Secret_key
    );

    //coockie establecida falta por utilizarla en el front-end
    res.cookie("user-coockie", token);
    res.status(200).json({
      id: user[0].id,
      name: user[0].name,
      username: user[0].username,
      token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Ups ocurrio un problema, intentelo de nuevo" });
  }
};
