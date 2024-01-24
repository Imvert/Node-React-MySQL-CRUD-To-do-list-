import axios from "../api/axios";

export const getTasksRequest = async () => {
  const response = await axios.get("/tasks");
  return response;
};

export const createTaskRequest = async (task) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };
  const response = await axios.post("/task", task);

  return response;
};

export const deleteTaskRequest = async (id) => {
  const response = await axios.delete(`/task/${id}`);
  return response;
};

//Obtiene un solo resultado por id
export const getTaskRequest = async (id) => {
  return await axios.get(`/task/${id}`);
};

export const updateTaskRequest = async (id, newfields) => {
  const response = await axios.put(`/task/${id}`, newfields);
  return response;
};

//Es el mismo endpoint que el updateTask solo que nomas actualiza de estado la tarea (Done)
export const toggleTaskDoneRequest = async (id, done) => {
  const response = await axios.put(`/task/${id}`, { done });
  return response;
};
