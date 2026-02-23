import React from "react";
import { NavLink } from "react-router-dom";
import { adminLinks } from "../../data/adminLinks";
import { useAuth } from "../auth/AuthProvider";

const AdminSidebar = () => {
  const { user } = useAuth();
  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-black/40 p-6 md:flex">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Innosphear</p>
        <p className="font-display text-xl text-white">Admin Console</p>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-white/10 text-cyan-200"
                  : "text-slate-300 hover:bg-white/5"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
        Role: {user?.role || "admin"}
      </div>
    </aside>
  );
};

export default AdminSidebar;







