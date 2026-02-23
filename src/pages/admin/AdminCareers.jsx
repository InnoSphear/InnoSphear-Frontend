import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const AdminCareers = () => {
  const { push } = useToast();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", status: "open" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", location: "", status: "open" });

  const load = async () => {
    const [jobsRes, appsRes] = await Promise.all([
      api.get("/careers/jobs"),
      api.get("/careers/applications"),
    ]);
    setJobs(jobsRes.data.data.items || []);
    setApplications(appsRes.data.data.items || []);
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post("/careers/jobs", form);
    push("Job posted");
    setForm({ title: "", location: "", status: "open" });
    load();
  };

  const startEdit = (job) => {
    setEditingId(job._id);
    setEditForm({
      title: job.title || "",
      location: job.location || "",
      status: job.status || "open",
    });
  };

  const saveEdit = async () => {
    await api.put(`/careers/jobs/${editingId}`, editForm);
    push("Job updated");
    setEditingId(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/careers/jobs/${id}`);
    push("Job deleted");
    load();
  };

  const updateApplication = async (id, status) => {
    await api.put(`/careers/applications/${id}`, { status });
    push("Application updated");
    load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Careers Management</h2>
        <p className="mt-2 text-sm text-slate-300">
          Post roles and manage applications, shortlists, and rejections.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Post a job</h3>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Role title"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <div className="md:col-span-3">
            <Button>Post Job</Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <Card key={job._id}>
            {editingId === job._id ? (
              <div className="space-y-3">
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                />
                <input
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                />
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 outline-none"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
                <div className="flex gap-2">
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
            ) : (
              <div>
                <p className="text-sm font-semibold text-white">{job.title}</p>
                <p className="mt-2 text-xs text-slate-400">{job.location}</p>
                <p className="text-xs text-slate-400">Status: {job.status}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="dark" className="px-4" onClick={() => startEdit(job)}>
                    Edit
                  </Button>
                  <button
                    onClick={() => remove(job._id)}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-display text-xl text-white">Applications</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          {applications.map((app) => (
            <div key={app._id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white">{app.name}</p>
                <p className="text-xs text-slate-400">{app.email}</p>
              </div>
              <select
                value={app.status}
                onChange={(event) => updateApplication(app._id, event.target.value)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200"
              >
                <option value="applied">Applied</option>
                <option value="shortlist">Shortlist</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminCareers;






