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
    try {
      if (loggedUserJson) {
        const userData = JSON.parse(loggedUserJson);
        setUser(userData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="bg-zinc-700 flex gap-x-16 px-20 py-2 justify-evenly md:justify-between ">
      <h1 className="text-white font-bold text-2xl">NoteRec</h1>

      <h3 className="text-white mr-10">
        📘 Notas de {user?.name || "la comunidad"}
      </h3>
      {!user?.name == "" ? (
        <ul className="flex gap-2 text-center">
          <li className="bg-red-500 px-2 py-1 rounded-sm h-8">
            <button onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </button>
          </li>
          <li className="bg-slate-200 px-2 py-1 rounded-sm h-8">
            <Link to="/tasks">HOME</Link>
          </li>
          <li className="bg-teal-400 px-8 py-1 rounded-sm h-8">
            <Link to="/new">New task</Link>
          </li>
        </ul>
      ) : (
        " "
      )}
    </div>
  );
}
