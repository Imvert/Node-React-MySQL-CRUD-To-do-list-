import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";
import confetti from "canvas-confetti";

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
  return (
    <div className="py-10">
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log(values);
          if (params.id) {
            await updateTask(params.id, values, token);
          } else {
            createTask(values, token);
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
              className="py-2 px-1 rounded-sm w-full"
              onChange={handleChange}
              name="title"
              placeholder="write a title"
              value={values.title}
            />
            <label className="block">Description</label>
            <textarea
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
