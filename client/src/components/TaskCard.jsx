import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";
import Swal from "sweetalert2";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const { user } = useUser();
  const navigate = useNavigate();

  const alertTokenExpired = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tus credenciales han expirado, logueate de nuevo porfavor",
      footer: "SERAS REDERIGIDO AL LOGIN",
    });
    window.localStorage.clear();
    navigate("/");
  };

  const handleDone = async () => {
    const toggleRsponse = await toggleTaskDone(task.id, user.token);
    if (toggleRsponse?.status == 401) {
      alertTokenExpired();
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Esta seguro de borrar la tarea?",
      text: "No se podra revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResponse = await deleteTask(task.id, user.token);
        if (deleteResponse?.status == 401) {
          alertTokenExpired();
        } else {
          Swal.fire("Eliminado!", "La tarea se a aliminado.", "success");
        }
      }
    });
  };

  return (
    <div className="bg-slate-300 w-auto sm:w-auto rounded-md p-4">
      <header className="flex justify-between">
        <h2 className="text-md font-bold">{task?.title}</h2>
        <span>{task.done === 1 ? "✅" : "❌"}</span>
      </header>
      <p className="text-sm text-balance ">{task.description}</p>
      <span>{task.createAt}</span>
      <div className="flex gap-x-1">
        <button
          className="bg-red-500 px-2 py-1 text-white"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
        <button
          className="bg-yellow-500 px-2 py-1 text-white"
          onClick={() => navigate(`/edit/${task?.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-green-500  px-2 py-1 text-white"
          onClick={() => handleDone(task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
