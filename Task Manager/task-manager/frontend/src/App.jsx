import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./Layout/MainLayout";
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import TaskPage from "./pages/TaskPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<TasksPage />} />
          <Route path="create" element={<CreateTaskPage />} />
          <Route path="task/:id" element={<TaskPage />} />
          <Route path="update-task/:id" element={<UpdateTaskPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
