import { Route, Routes } from "react-router-dom";
import TasksPage from "./pages/TaskPage";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { TaskContextProvider } from "./context/TaskContext";

function App() {
  return (
    <div className="bg-zinc-900 h-screen">
      <Navbar />
      <div className="container mx-auto py-4">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage />}></Route>
            <Route path="/new" element={<TaskForm />}></Route>
            <Route path="/edit/:id" element={<TaskForm />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
}

export default App;
