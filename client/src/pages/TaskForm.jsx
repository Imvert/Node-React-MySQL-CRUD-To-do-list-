import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";

function TaskForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { user } = useUser();
  const { createTask, getTask, updateTask } = useTasks();
  const { token } = user;
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id, token);
        setTask({ title: task.title, description: task.description });
      }
    };
    loadTask();
  }, []);

  const alertTokenExpired = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tus credenciales han expirado, logueate de nuevo porfavor",
      footer: "SERAS REDERIGIDO AL LOGIN",
      timer: 3000,
    });
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="py-10 h-screen">
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (params.id) {
            const updateResponse = await updateTask(params.id, values, token);
            if (updateResponse.status == 401) {
              alertTokenExpired();
            }
          } else {
            const createResponse = await createTask(values, token);
            if (createResponse.status == 401) {
              alertTokenExpired();
            }
          }
          confetti();
          setTimeout(() => {
            navigate("/tasks");
          }, 2000);

          setTask({ title: "", description: "" });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto"
          >
            <h1 className="text-xl font-bold text-center">
              {params.id ? "Edit Task" : "New Task"}
            </h1>
            <label className="block">Title</label>
            <input
              type="text"
              required
              className="py-2 px-1 rounded-sm w-full"
              onChange={handleChange}
              name="title"
              placeholder="write a title"
              value={values.title}
            />
            <label className="block">Description</label>
            <textarea
              required
              name="description"
              className="py-2 px-1 rounded-sm w-full"
              onChange={handleChange}
              placeholder="write a description"
              rows="3"
              value={values.description}
            ></textarea>
            <button
              className="block bg-indigo-500 px-2 py-1 text-white rounded-md w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
      <p style={{ color: "red" }}>{errorMsg}</p>
    </div>
  );
}

export default TaskForm;
