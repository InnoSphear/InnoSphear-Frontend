import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminProjects = () => {
  const { push } = useToast();
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", client: "", status: "pending" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", client: "", status: "pending" });

  const load = async () => {
    const [projectsRes, clientsRes] = await Promise.all([
      api.get("/projects"),
      api.get("/clients?limit=100"),
    ]);
    setProjects(projectsRes.data.data.items || []);
    setClients(clientsRes.data.data.items || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post("/projects", form);
    push("Project created");
    setForm({ name: "", client: "", status: "pending" });
    load();
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setEditForm({
      name: project.name || "",
      client: project.client?._id || "",
      status: project.status || "pending",
    });
  };

  const saveEdit = async () => {
    await api.put(`/projects/${editingId}`, editForm);
    push("Project updated");
    setEditingId(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/projects/${id}`);
    push("Project deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Project Management</h2>
        <p className="mt-2 text-sm text-slate-300">
          Create and assign projects, manage deadlines, and upload files.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Create project</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Project name"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <select
            name="client"
            value={form.client}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          >
            <option value="">Select client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="md:col-span-3">
            <Button>Create Project</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project._id}>
            {editingId === project._id ? (
              <div className="space-y-3">
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                />
                <select
                  name="client"
                  value={editForm.client}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                >
                  <option value="">Select client</option>
                  {clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex gap-2">
                  <Button variant="dark" className="px-4" onClick={saveEdit}>
                    Save
                  </Button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-white">{project.name}</p>
                <p className="mt-2 text-xs text-slate-400">{project.status}</p>
                <p className="text-xs text-slate-400">
                  Client: {project.client?.name || "Unassigned"}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="dark" className="px-4" onClick={() => startEdit(project)}>
                    Edit
                  </Button>
                  <button
                    onClick={() => remove(project._id)}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;






