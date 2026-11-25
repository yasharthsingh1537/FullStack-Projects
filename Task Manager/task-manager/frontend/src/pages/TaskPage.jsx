import { useState } from "react";
import { useEffect } from "react";
import { tasksApi } from "../api/tasksApi";
import { Link, useNavigate, useParams } from "react-router";

export default function TaskPage() {
    const { id } = useParams();
    const navigate=useNavigate()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [task, setTask] = useState();

  useEffect(() => {
    setLoading(true);
    tasksApi
      .getOne(id)
      .then((task) => setTask(task.data ?? task))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    try {
        await tasksApi.remove(id);
        navigate('/')
    } catch (error) {
      setError(error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return <p>Task not found!!</p>;

  return (
    <div>
      <h1>Task</h1>
      <p>Task: {task.title}</p>
      <br />
      <p>Task Status: {task.status}</p>
      <br />
      <p>Task Description: {task.description} </p>
      <button type="button" onClick={() => handleDelete(task._id)}>
        Delete
      </button>
      <Link to={`/update-task/${task._id}`}>Update Task</Link>
    </div>
  );
}
