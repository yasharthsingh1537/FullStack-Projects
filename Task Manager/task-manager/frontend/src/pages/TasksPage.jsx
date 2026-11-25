import { useEffect, useState } from "react";
import { tasksApi } from "../api/tasksApi";
import { Link } from "react-router";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleDelete(id) {
    try {
      await tasksApi.remove(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <h1>All Tasks</h1>
      {tasks.length === 0 ? (
        <p>
          No tasks yet. <Link to="/create">Create a new Task</Link>
        </p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <p>
                <Link to={`/task/${task._id}`}>{task.title}</Link>- {task.status}
                <button type="button" onClick={() => handleDelete(task._id)}>
                  Delete
                </button>
                <Link to={`/update-task/${task._id}`}>Update Task</Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
