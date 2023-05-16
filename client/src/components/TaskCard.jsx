import React from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleTaskDone(task.id, user.token);
  };

  return (
    <div className="bg-slate-300 rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done === 1 ? "✅" : "❌"}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span>{task.createAt}</span>
      <div className="flex gap-x-1">
        <button
          className="bg-red-500 px-2 py-1 text-white"
          onClick={() => {
            deleteTask(task.id, user.token);
          }}
        >
          Delete
        </button>
        <button
          className="bg-yellow-500 px-2 py-1 text-white"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-green-500 px-2 py-1 text-white"
          onClick={() => handleDone(task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
