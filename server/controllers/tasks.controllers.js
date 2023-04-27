import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { Secret_key } from "../../config.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

export const getTask = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (result.length === 0)
      return res.status(404).json({ msg: "Task not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description, user_id } = req.body;

  const authorization = req.get("authorization");
  let token = " ";
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }
  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, Secret_key);
  } catch (error) {
    console.log(error.message);
  }
  if (!token || !decodedToken.id) {
    return res.status(401).json({ msg: "token missing or invalid" });
  }

  try {
    const { id: user_id } = decodedToken;
    const [result] = await pool.query(
      "INSERT INTO tasks(title,description,user_id) VALUES(?,?,?)",
      [title, description, user_id]
    );

    res.json({ id: result.insertId, title, description });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ? ", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ msg: "Task not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
