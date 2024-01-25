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
    const response = await getTasksRequest();
    setTasks(response.data);
    return response;
  }

  const deleteTask = async (id, token) => {
    try {
      const deleteResponse = await deleteTaskRequest(id);
      if (deleteResponse.status == 401) {
        return deleteResponse;
      } else {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);
      const toggleResponse = await toggleTaskDoneRequest(
        id,
        taskFound.done === 0 ? 1 : 0
      );
      if (toggleResponse.status == 401) {
        return toggleResponse;
      } else {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
          )
        );
      }
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
