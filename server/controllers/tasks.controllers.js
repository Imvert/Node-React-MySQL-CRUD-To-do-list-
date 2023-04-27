import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  const { user_id } = req;
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY createAt ASC ",
      [user_id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

export const getTask = async (req, res) => {
  const id = req.params.id;
  const { user_id } = req; //este parametro viene de la validacion del userEstractor

  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.length === 0)
      return res.status(404).json({ msg: "Task not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
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
  const { user_id } = req;
  try {
    const result = await pool.query(
      "UPDATE tasks SET ? WHERE id = ? AND user_id = ?",
      [req.body, req.params.id, user_id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteTasks = async (req, res) => {
  const { user_id } = req;
  try {
    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ? ",
      [req.params.id, user_id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ msg: "Task not found" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
