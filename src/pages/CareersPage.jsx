import React, { useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import MotionReveal from "../components/MotionReveal";
import Button from "../components/ui/Button";
import { jobs } from "../data/siteContent";
import { useToast } from "../components/ui/ToastProvider";
import api from "../api/client";

const CareersPage = () => {
  const { push } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    portfolio: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.role) {
      push("Please complete all required fields.", "error");
      return;
    }
    await api.post("/careers/applications", {
      name: form.name,
      email: form.email,
      coverLetter: form.role,
      resumeUrl: form.portfolio,
    });
    push("Application received. Our HR team will reach out soon.");
    setForm({ name: "", email: "", role: "", portfolio: "" });
  };

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Careers"
          title="Join a distributed team of senior makers."
          description="We build with clarity, craft, and accountability. Explore open roles or send a proactive application."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {jobs.map((job) => (
            <MotionReveal key={job.title}>
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {job.team}
                </p>
                <h3 className="mt-4 font-display text-xl text-white">
                  {job.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300">{job.location}</p>
                <p className="text-xs text-slate-500">{job.type}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal>
          <Card>
            <h3 className="font-display text-2xl text-white">Apply now</h3>
            <form
              className="mt-6 grid gap-4 md:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
                required
              />
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Role of interest"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
                required
              />
              <input
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                placeholder="Portfolio link"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              />
              <div className="md:col-span-2">
                <Button>Submit application</Button>
              </div>
            </form>
          </Card>
        </MotionReveal>
      </div>
    </div>
  );
};

export default CareersPage;







