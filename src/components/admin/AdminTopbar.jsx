import React from "react";
import Button from "../ui/Button";
import { useAuth } from "../auth/AuthProvider";

const AdminTopbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/40 px-6 py-4 md:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
        <p className="font-display text-xl text-white">
          Welcome back, {user?.name || "Admin"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <input
          placeholder="Search projects, clients, tasks"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-500"
        />
        <Button variant="dark" className="hidden sm:inline-flex">
          Create
        </Button>
        <button
          onClick={logout}
          className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;







