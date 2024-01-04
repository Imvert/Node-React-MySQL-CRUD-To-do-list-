import axios from "../api/axios";

export const getTasksRequest = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/tasks", config);
  return response;
};

export const createTaskRequest = async (task, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post("/task", task, config);

  return response;
};

export const deleteTaskRequest = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`/task/${id}`, config);
  return response;
};

//Obtiene un solo resultado por id
export const getTaskRequest = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(`/task/${id}`, config);
};

export const updateTaskRequest = async (id, newfields, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`/task/${id}`, newfields, config);
  return response;
};

//Es el mismo endpoint que el updateTask solo que nomas actualiza de estado la tarea (Done)
export const toggleTaskDoneRequest = async (id, done, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`/task/${id}`, { done }, config);
  return response;
};
