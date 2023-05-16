import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export default function Navbar() {
  const { user, setUser } = useUser();

  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem("loggedNoteAppUser");
    window.localStorage.removeItem("tasksApp");
  }
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJson) {
      const userData = JSON.parse(loggedUserJson);
      setUser(userData);
    }
  }, []);

  return (
    <div className="bg-zinc-700 flex justify-between px-20 py-2">
      <Link to={"/tasks"}>
        <h1 className="text-white font-bold text-2xl">React - MySQL</h1>
      </Link>
      <h3 className="text-white mr-10">
        📘 Notas de {user?.name || "la comunidad"}
      </h3>
      {!user?.name == "" ? (
        <ul className="flex gap-2">
          <li className="bg-red-500 px-2 py-1 rounded-sm">
            <button onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </button>
          </li>
          <li className="bg-slate-200 px-2 py-1 rounded-sm">
            <Link to="/tasks">HOME</Link>
          </li>
          <li className="bg-teal-400 px-2 py-1 rounded-sm">
            <Link to="/new">Create task</Link>
          </li>
        </ul>
      ) : (
        " "
      )}
    </div>
  );
}
