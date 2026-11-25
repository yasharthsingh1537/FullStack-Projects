import { useState } from "react";
import { useNavigate } from "react-router";
import { tasksApi } from "../api/tasksApi";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      await tasksApi.create({ title, status, description });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Create Task</h1>
      {error && <p role="alert"> {error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Buy Books"
          />
        </div>
        <br />
        <div>
          <label htmlFor="status">Status: </label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Buy books from the nearby store"
            rows={10}
            cols={50}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
