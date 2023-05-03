import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TaskPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { TaskContextProvider } from "./context/TaskContext";
import { UserContextProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="bg-zinc-900 h-screen">
      <Navbar />
      <div className="container mx-auto py-4">
        <UserContextProvider>
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
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
