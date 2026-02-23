import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import api from "../api/client";
import { useToast } from "../components/ui/ToastProvider";

const ClientLoginPage = () => {
  const { push } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/auth/login", form);
      push("Login successful");
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      push(msg, "error");
    }
  };

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <Card className="w-full max-w-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            Client Portal
          </p>
          <h2 className="mt-4 font-display text-3xl text-white">
            Access your Innosphear workspace
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Track project status, invoices, and milestones securely.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              required
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              required
            />
            <Button className="w-full">Sign in</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ClientLoginPage;





