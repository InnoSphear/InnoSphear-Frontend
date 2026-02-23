import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminClients = () => {
  const { push } = useToast();
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", company: "" });

  const load = async () => {
    const res = await api.get("/clients");
    setClients(res.data.data.items || []);
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
    await api.post("/clients", form);
    push("Client added");
    setForm({ name: "", email: "", company: "" });
    load();
  };

  const startEdit = (client) => {
    setEditingId(client._id);
    setEditForm({
      name: client.name || "",
      email: client.email || "",
      company: client.company || "",
    });
  };

  const saveEdit = async () => {
    await api.put(`/clients/${editingId}`, editForm);
    push("Client updated");
    setEditingId(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/clients/${id}`);
    push("Client deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Client Management</h2>
        <p className="mt-2 text-sm text-slate-300">
          Add clients, assign projects, and track billing.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Add client</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client name"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <div className="md:col-span-3">
            <Button>Add Client</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {clients.map((client) => (
          <Card key={client._id}>
            {editingId === client._id ? (
              <div className="space-y-3">
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                />
                <input
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                />
                <input
                  name="company"
                  value={editForm.company}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                />
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
                <p className="text-sm font-semibold text-white">{client.name}</p>
                <p className="mt-2 text-xs text-slate-400">{client.email}</p>
                <p className="text-xs text-slate-400">{client.company}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="dark" className="px-4" onClick={() => startEdit(client)}>
                    Edit
                  </Button>
                  <button
                    onClick={() => remove(client._id)}
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

export default AdminClients;






