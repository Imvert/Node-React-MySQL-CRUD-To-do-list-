import axios from "axios";

export const getTasksRequest = async () =>
  await axios.get("http://localhost:4001/api/tasks");

export const createTaskRequest = async (task) =>
  await axios.post("http://localhost:4001/api/task", task);

export const deleteTaskRequest = async (id) =>
  await axios.delete(`http://localhost:4001/api/task/${id}`);

//Obtiene un solo resultado por id
export const getTaskRequest = async (id) =>
  await axios.get(`http://localhost:4001/api/task/${id}`);

export const updateTaskRequest = async (id, newfields) =>
  await axios.put(`http://localhost:4001/api/task/${id}`, newfields);

export const toggleTaskDoneRequest = async (id, done) =>
  await axios.put(`http://localhost:4001/api/task/${id}`, { done });
