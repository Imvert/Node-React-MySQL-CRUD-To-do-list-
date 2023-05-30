import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";

function TasksPage() {
  const { tasks, loadTasks, setTasks } = useTasks();
  const { user } = useUser();

  const { token } = user;

  useEffect(() => {
    async function getTaks() {
      const { data } = await loadTasks(token);
      window.localStorage.setItem("tasksApp", JSON.stringify(data));
    }
    getTaks();
  }, []);

  useEffect(() => {
    const taskslocal = window.localStorage.getItem("tasksApp");
    if (taskslocal) {
      const data = JSON.parse(taskslocal);
      setTasks(data);
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
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>
    </div>
  );
}

export default TasksPage;
