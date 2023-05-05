import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="bg-zinc-700 flex justify-between px-20 py-2">
      <Link to={"/tasks"}>
        <h1 className="text-white font-bold text-2xl">React - MySQL</h1>
      </Link>

      {!user.name == "" ? (
        <ul className="flex gap-2">
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
