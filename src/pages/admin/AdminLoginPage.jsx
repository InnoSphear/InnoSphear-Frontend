import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAuth } from "../../components/auth/AuthProvider";
import { useToast } from "../../components/ui/ToastProvider";

const AdminLoginPage = () => {
  const { login } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await login(form.email, form.password);
      push("Welcome back. You're signed in.");
      navigate("/admin");
    } catch (error) {
      const msg = error?.response?.data?.message || "Invalid credentials. Try again.";
      push(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090f] px-6 py-20">
      <div className="mx-auto max-w-md">
        <Card>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
            Admin Access
          </p>
          <h2 className="mt-4 font-display text-3xl text-white">
            Sign in to Innosphear Admin
          </h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              name="email"
              placeholder="Work email"
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
            <Button className="w-full">{loading ? "Signing in..." : "Sign in"}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;





