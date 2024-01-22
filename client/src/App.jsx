import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import TasksPage from "./pages/TaskPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { TaskContextProvider } from "./context/TaskContext";
import { UserContextProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const AutenticatedUser = window.localStorage.getItem("loggedNoteAppUser");
    var data = JSON.parse(AutenticatedUser);

    {
      data == null ? navigate("/") : navigate("/tasks");
    }
  }, []);

  return (
    <div className=" bg-zinc-900 mx-auto h-[100%] md:h-[100vh] sm:h-screen-[100%]">
      <UserContextProvider>
        <Navbar />
        {/* este div sobrak */}
        <div className=" mx-auto py-4">
          <TaskContextProvider>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/tasks" element={<TasksPage />}></Route>
              <Route path="/new" element={<TaskForm />}></Route>
              <Route path="/edit/:id" element={<TaskForm />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </TaskContextProvider>
        </div>
      </UserContextProvider>
    </div>
  );
}

export default App;
