import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminPricing = () => {
  const { push } = useToast();
  const [pricing, setPricing] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", cycle: "", summary: "", features: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/pricing?limit=100");
    setPricing(res.data.data.items || []);
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
      features: form.features
        ? form.features.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
    };
    if (editingId) {
      await api.put(`/pricing/${editingId}`, payload);
      push("Pricing updated");
    } else {
      await api.post("/pricing", payload);
      push("Pricing created");
    }
    setForm({ name: "", price: "", cycle: "", summary: "", features: "" });
    setEditingId(null);
    load();
  };

  const startEdit = (plan) => {
    setEditingId(plan._id);
    setForm({
      name: plan.name || "",
      price: plan.price || "",
      cycle: plan.cycle || "",
      summary: plan.summary || "",
      features: Array.isArray(plan.features) ? plan.features.join(", ") : "",
    });
  };

  const remove = async (id) => {
    await api.delete(`/pricing/${id}`);
    push("Pricing deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Pricing</h2>
        <p className="mt-2 text-sm text-slate-300">Manage pricing plans.</p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Add / Edit Plan</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={submit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Plan name"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <input
            name="cycle"
            value={form.cycle}
            onChange={handleChange}
            placeholder="Cycle"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Summary"
            className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <input
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="Features (comma separated)"
            className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <div className="md:col-span-3 flex gap-2">
            <Button>{editingId ? "Update" : "Create"}</Button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", price: "", cycle: "", summary: "", features: "" });
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
        {pricing.map((plan) => (
          <Card key={plan._id}>
            <p className="text-sm font-semibold text-white">{plan.name}</p>
            <p className="mt-2 text-xs text-slate-400">{plan.price} {plan.cycle}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="dark" className="px-4" onClick={() => startEdit(plan)}>
                Edit
              </Button>
              <button
                onClick={() => remove(plan._id)}
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

export default AdminPricing;


