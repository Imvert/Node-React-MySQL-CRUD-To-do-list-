import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from "../api/tasks.api";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be within a TaskContextProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks(token) {
    const response = await getTasksRequest(token);
    setTasks(response.data);
    return response;
  }

  const deleteTask = async (id, token) => {
    try {
      await deleteTaskRequest(id, token);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task, token) => {
    try {
      await createTaskRequest(task, token);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id, token) => {
    try {
      const response = await getTaskRequest(id, token);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, newFields, token) => {
    try {
      const response = await updateTaskRequest(id, newFields, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskDone = async (id, token) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);
      await toggleTaskDoneRequest(id, taskFound.done === 0 ? 1 : 0, token);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loadTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
