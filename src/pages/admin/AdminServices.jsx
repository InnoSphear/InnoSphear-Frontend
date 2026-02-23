import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminServices = () => {
  const { push } = useToast();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", highlights: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/services?limit=100");
    setServices(res.data.data.items || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      highlights: form.highlights
        ? form.highlights.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
    };
    if (editingId) {
      await api.put(`/services/${editingId}`, payload);
      push("Service updated");
    } else {
      await api.post("/services", payload);
      push("Service created");
    }
    setForm({ title: "", description: "", highlights: "" });
    setEditingId(null);
    load();
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title || "",
      description: service.description || "",
      highlights: Array.isArray(service.highlights) ? service.highlights.join(", ") : "",
    });
  };

  const remove = async (id) => {
    await api.delete(`/services/${id}`);
    push("Service deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Services</h2>
        <p className="mt-2 text-sm text-slate-300">Manage services displayed on the website.</p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Add / Edit Service</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={submit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <input
            name="highlights"
            value={form.highlights}
            onChange={handleChange}
            placeholder="Highlights (comma separated)"
            className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <div className="md:col-span-3 flex gap-2">
            <Button>{editingId ? "Update" : "Create"}</Button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ title: "", description: "", highlights: "" });
                }}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service._id}>
            <p className="text-sm font-semibold text-white">{service.title}</p>
            <p className="mt-2 text-xs text-slate-400">{service.description}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="dark" className="px-4" onClick={() => startEdit(service)}>
                Edit
              </Button>
              <button
                onClick={() => remove(service._id)}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-200"
              >
                Delete
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;


