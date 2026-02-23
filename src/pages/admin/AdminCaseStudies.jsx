import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminCaseStudies = () => {
  const { push } = useToast();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", summary: "", metrics: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/case-studies?limit=100");
    setItems(res.data.data.items || []);
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
    if (editingId) {
      await api.put(`/case-studies/${editingId}`, form);
      push("Case study updated");
    } else {
      await api.post("/case-studies", form);
      push("Case study created");
    }
    setForm({ title: "", category: "", summary: "", metrics: "" });
    setEditingId(null);
    load();
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      category: item.category || "",
      summary: item.summary || "",
      metrics: item.metrics || "",
    });
  };

  const remove = async (id) => {
    await api.delete(`/case-studies/${id}`);
    push("Case study deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Case Studies</h2>
        <p className="mt-2 text-sm text-slate-300">Manage portfolio case studies.</p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Add / Edit Case Study</h3>
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
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <input
            name="metrics"
            value={form.metrics}
            onChange={handleChange}
            placeholder="Metrics"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            rows={3}
            placeholder="Summary"
            className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <div className="md:col-span-3 flex gap-2">
            <Button>{editingId ? "Update" : "Create"}</Button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ title: "", category: "", summary: "", metrics: "" });
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
        {items.map((item) => (
          <Card key={item._id}>
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-xs text-slate-400">{item.category}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="dark" className="px-4" onClick={() => startEdit(item)}>
                Edit
              </Button>
              <button
                onClick={() => remove(item._id)}
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

export default AdminCaseStudies;


