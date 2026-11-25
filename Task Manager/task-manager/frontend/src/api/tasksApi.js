async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }

  return data.data;
}

export const tasksApi = {
  getAll: () => request("/api/tasks/all-tasks"),
  getOne: (id) => request(`/api/tasks/task/${id}`),
  create: (payload) =>
    request("/api/tasks/create-task", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    request(`/api/tasks/update-task/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  remove: (id) =>
    request(`/api/tasks/delete-task/${id}`, {
      method: "DELETE",
    }),
};
