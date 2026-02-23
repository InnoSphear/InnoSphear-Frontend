import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import api from "../../api/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    revenue: 0,
    tasks: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [clientsRes, projectsRes, tasksRes, invoicesRes] = await Promise.all([
        api.get("/clients?limit=1"),
        api.get("/projects?limit=1"),
        api.get("/tasks?limit=1"),
        api.get("/finance/invoices?limit=1"),
      ]);
      const revenue = invoicesRes.data.data.items.reduce(
        (sum, inv) => sum + (inv.amount || 0),
        0
      );
      setStats({
        clients: clientsRes.data.data.total,
        projects: projectsRes.data.data.total,
        tasks: tasksRes.data.data.total,
        revenue,
      });
    };
    load().catch(() => null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Total Clients
          </p>
          <p className="mt-3 text-2xl text-white">{stats.clients}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Active Projects
          </p>
          <p className="mt-3 text-2xl text-white">{stats.projects}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Revenue
          </p>
          <p className="mt-3 text-2xl text-white">${stats.revenue}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Open Tasks
          </p>
          <p className="mt-3 text-2xl text-white">{stats.tasks}</p>
        </Card>
      </div>

      <Card>
        <p className="text-sm font-semibold text-white">Monthly analytics</p>
        <p className="mt-2 text-sm text-slate-300">
          Connect to your analytics service for charts and KPI tracking.
        </p>
      </Card>
    </div>
  );
};

export default AdminDashboard;







