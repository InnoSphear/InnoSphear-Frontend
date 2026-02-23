import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminTeam = () => {
  const { push } = useToast();
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });

  const load = async () => {
    const res = await api.get("/team");
    setMembers(res.data.data.items || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post("/auth/register", form);
    push("Team member added");
    setForm({ name: "", email: "", password: "", role: "admin" });
    load();
  };

  const updateRole = async (id, role) => {
    await api.put(`/team/${id}`, { role });
    push("Role updated");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Team Management</h2>
        <p className="mt-2 text-sm text-slate-300">
          Add team members, assign roles, and track performance.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Add team member</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
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
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Temp password"
            type="password"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          >
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="project_manager">Project Manager</option>
          </select>
          <div className="md:col-span-4">
            <Button>Add Member</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {members.map((member) => (
          <Card key={member._id}>
            <p className="text-sm font-semibold text-white">{member.name}</p>
            <p className="mt-2 text-xs text-slate-400">{member.email}</p>
            <select
              value={member.role}
              onChange={(event) => updateRole(member._id, event.target.value)}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="project_manager">Project Manager</option>
            </select>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTeam;






