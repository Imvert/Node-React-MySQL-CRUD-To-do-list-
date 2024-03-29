import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";

function TasksPage() {
  const { tasks, loadTasks, setTasks } = useTasks();
  const { user } = useUser();

  const { token } = user;

  async function getTasks() {
    const { data } = await loadTasks(token);
    window.localStorage.setItem("tasksApp", JSON.stringify(data));
  }

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    const taskslocal = window.localStorage.getItem("tasksApp");
    if (taskslocal) {
      const data = JSON.parse(taskslocal);
      setTasks(data);
      getTasks();
    }
  }, []);

  function renderMain() {
    if (tasks.length === 0) {
      return <h1 className="text-yellow-50 text-2xl">No tasks yet</h1>;
    }
    return tasks.map((task) => <TaskCard task={task} key={task.id}></TaskCard>);
  }

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center pb-5">Tasks</h1>
      <div className=" pl-2 pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 gap-y-4">
        {renderMain()}
      </div>
    </div>
  );
}

export default TasksPage;
