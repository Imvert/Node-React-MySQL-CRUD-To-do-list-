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

      <h3 className="text-white mr-10 flex flex-col md:flex-row">
        📘 Notas de
        {
          <h5 className="text-yellow-300 md:ml-1 uppercase">
            {user?.name || "la comunidad"}
          </h5>
        }
      </h3>
      {!user?.name == "" ? (
        <ul className=" flex gap-2 text-center font-semibold flex-col  md:flex-row">
          <li className="bg-red-500  px-2 py-1 rounded-sm h-8 hover:scale-105">
            <button onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </button>
          </li>
          <li className="bg-slate-200 font-semibold  px-2 py-1 rounded-sm h-8 hover:scale-105">
            <Link to="/tasks">HOME</Link>
          </li>
          <li className="bg-teal-400 font-semibold px-8  rounded-sm md:h-8 md:py-1 hover:scale-105">
            <Link to="/new">New task</Link>
          </li>
        </ul>
      ) : (
        " "
      )}
    </div>
  );
}
