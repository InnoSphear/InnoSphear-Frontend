import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminDeals = () => {
  const { push } = useToast();
  const [deals, setDeals] = useState([]);
  const [form, setForm] = useState({ name: "", company: "", value: "", stage: "lead" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/deals?limit=100");
    setDeals(res.data.data.items || []);
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
    const payload = { ...form, value: Number(form.value || 0) };
    if (editingId) {
      await api.put(`/deals/${editingId}`, payload);
      push("Deal updated");
    } else {
      await api.post("/deals", payload);
      push("Deal created");
    }
    setForm({ name: "", company: "", value: "", stage: "lead" });
    setEditingId(null);
    load();
  };

  const startEdit = (deal) => {
    setEditingId(deal._id);
    setForm({
      name: deal.name || "",
      company: deal.company || "",
      value: deal.value || "",
      stage: deal.stage || "lead",
    });
  };

  const remove = async (id) => {
    await api.delete(`/deals/${id}`);
    push("Deal deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Deals</h2>
        <p className="mt-2 text-sm text-slate-300">Track pipeline deals and stages.</p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Add / Edit Deal</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-4" onSubmit={submit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Deal name"
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
          <input
            name="value"
            value={form.value}
            onChange={handleChange}
            placeholder="Value"
            type="number"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <select
            name="stage"
            value={form.stage}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          >
            <option value="lead">Lead</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
          <div className="md:col-span-4 flex gap-2">
            <Button>{editingId ? "Update" : "Create"}</Button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", company: "", value: "", stage: "lead" });
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
        {deals.map((deal) => (
          <Card key={deal._id}>
            <p className="text-sm font-semibold text-white">{deal.name}</p>
            <p className="mt-2 text-xs text-slate-400">{deal.company}</p>
            <p className="text-xs text-slate-400">Value: ${deal.value}</p>
            <p className="text-xs text-slate-400">Stage: {deal.stage}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="dark" className="px-4" onClick={() => startEdit(deal)}>
                Edit
              </Button>
              <button
                onClick={() => remove(deal._id)}
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

export default AdminDeals;


