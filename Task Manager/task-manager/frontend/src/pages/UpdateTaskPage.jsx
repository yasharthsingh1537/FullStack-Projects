import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { tasksApi } from "../api/tasksApi";

export default function UpdateTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // getting the original task
  useEffect(() => {
    setLoading(true);
    tasksApi
      .getOne(id)
      .then((task) => setTask(task.data ?? task))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await tasksApi.update(id, {
        title: task.title,
        status: task.status,
        description: task.description,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return <p>Task not found!!</p>;
  return (
    <div>
      <h1>Update the task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={task.title || ""}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="e.g. Buy Books"
          />
        </div>
        <br />
        <div>
          <label htmlFor="status">Status: </label>
          <select
            id="status"
            value={task.status || ""}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="description">Description: </label>
          <br />
          <textarea
            id="description"
            type="text"
            value={task.description || ""}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Buy books from the nearby store"
            rows={10}
            cols={50}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Update Task"}
        </button>
      </form>
    </div>
  );
}
