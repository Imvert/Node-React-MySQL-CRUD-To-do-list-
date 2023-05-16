import axios from "axios";

export const getTasksRequest = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("http://localhost:4001/api/tasks", config);
  return response;
};

export const createTaskRequest = async (task, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.post("http://localhost:4001/api/task", task, config);
};

export const deleteTaskRequest = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`http://localhost:4001/api/task/${id}`, config);
};

//Obtiene un solo resultado por id
export const getTaskRequest = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(`http://localhost:4001/api/task/${id}`, config);
};

export const updateTaskRequest = async (id, newfields, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(`http://localhost:4001/api/task/${id}`, newfields, config);
};

//Es el mismo endpoint que el updateTask solo que nomas actualiza de estado la tarea (Done)
export const toggleTaskDoneRequest = async (id, done, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.put(`http://localhost:4001/api/task/${id}`, { done }, config);
};
