import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminFinance = () => {
  const { push } = useToast();
  const [invoices, setInvoices] = useState([]);
  const [invoiceForm, setInvoiceForm] = useState({ amount: "", status: "pending" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ amount: "", status: "pending" });

  const load = async () => {
    const res = await api.get("/finance/invoices");
    setInvoices(res.data.data.items || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const handleInvoiceChange = (event) => {
    const { name, value } = event.target;
    setInvoiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitInvoice = async (event) => {
    event.preventDefault();
    await api.post("/finance/invoices", {
      amount: Number(invoiceForm.amount),
      status: invoiceForm.status,
    });
    push("Invoice created");
    setInvoiceForm({ amount: "", status: "pending" });
    load();
  };

  const startEdit = (invoice) => {
    setEditingId(invoice._id);
    setEditForm({ amount: invoice.amount || "", status: invoice.status || "pending" });
  };

  const saveEdit = async () => {
    await api.put(`/finance/invoices/${editingId}`, {
      amount: Number(editForm.amount),
      status: editForm.status,
    });
    push("Invoice updated");
    setEditingId(null);
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Financial Tracking</h2>
        <p className="mt-2 text-sm text-slate-300">
          Generate invoices and track payments.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Create invoice</h3>
        <form className="mt-4 space-y-3" onSubmit={submitInvoice}>
          <input
            name="amount"
            value={invoiceForm.amount}
            onChange={handleInvoiceChange}
            placeholder="Amount"
            type="number"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <select
            name="status"
            value={invoiceForm.status}
            onChange={handleInvoiceChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
          <Button>Create Invoice</Button>
        </form>
      </Card>

      {editingId && (
        <Card>
          <h3 className="font-display text-xl text-white">Edit invoice</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input
              name="amount"
              value={editForm.amount}
              onChange={handleEditChange}
              type="number"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
            />
            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <div className="md:col-span-2 flex gap-2">
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
        </Card>
      )}

      <Card>
        <h3 className="font-display text-xl text-white">Recent invoices</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          {invoices.map((invoice) => (
            <div key={invoice._id} className="flex items-center justify-between gap-4">
              <span>${invoice.amount}</span>
              <span>{invoice.status}</span>
              <button
                onClick={() => startEdit(invoice)}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminFinance;


