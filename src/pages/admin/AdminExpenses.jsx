import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminExpenses = () => {
  const { push } = useToast();
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: "", amount: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/expenses?limit=100");
    setExpenses(res.data.data.items || []);
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
    const payload = { ...form, amount: Number(form.amount || 0) };
    if (editingId) {
      await api.put(`/expenses/${editingId}`, payload);
      push("Expense updated");
    } else {
      await api.post("/expenses", payload);
      push("Expense created");
    }
    setForm({ category: "", amount: "" });
    setEditingId(null);
    load();
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({ category: item.category || "", amount: item.amount || "" });
  };

  const remove = async (id) => {
    await api.delete(`/expenses/${id}`);
    push("Expense deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Expense Tracker</h2>
        <p className="mt-2 text-sm text-slate-300">Track and update expenses.</p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Add / Edit Expense</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={submit}>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <div className="md:col-span-3 flex gap-2">
            <Button>{editingId ? "Update" : "Create"}</Button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ category: "", amount: "" });
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
        {expenses.map((expense) => (
          <Card key={expense._id}>
            <p className="text-sm font-semibold text-white">{expense.category}</p>
            <p className="mt-2 text-xs text-slate-400">Amount: ${expense.amount}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="dark" className="px-4" onClick={() => startEdit(expense)}>
                Edit
              </Button>
              <button
                onClick={() => remove(expense._id)}
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

export default AdminExpenses;


