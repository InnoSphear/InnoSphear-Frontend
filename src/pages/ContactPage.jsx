import React, { useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MotionReveal from "../components/MotionReveal";
import { useToast } from "../components/ui/ToastProvider";
import api from "../api/client";

const ContactPage = () => {
  const { push } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      push("Please fill out the required fields.", "error");
      return;
    }
    await api.post("/leads", {
      name: form.name,
      email: form.email,
      company: form.company,
      notes: form.message,
      source: "contact_form",
    });
    push("Thanks! We will be in touch within 24 hours.");
    setForm({ name: "", email: "", company: "", budget: "", message: "" });
  };

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Contact"
          title="Tell us about your next global launch."
          description="Share your goals and timelines. Our senior team will reply within one business day."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <MotionReveal>
            <Card className="md:col-span-2">
              <h3 className="font-display text-xl text-white">Project inquiry</h3>
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
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
                />
                <input
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Budget range"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your goals"
                  rows={5}
                  className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
                  required
                />
                <div className="md:col-span-2">
                  <Button>Submit inquiry</Button>
                </div>
              </form>
            </Card>
          </MotionReveal>

          <MotionReveal>
            <Card>
              <h3 className="font-display text-xl text-white">Online Presence</h3>
              <p className="mt-4 text-sm text-slate-300">Ofline:- Kishanganj (Bihar), Dalkhola Uttar Dinajpur (West Bengal)</p>
              <p className="text-sm text-slate-300">India</p>
              <div className="mt-6 space-y-2 text-sm text-slate-300">
                <p>innosphear@gmail.com</p>
                <p>+91 6203818011</p>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
                Availability: Mon-Sun, 24-hour response SLA.
              </div>
            </Card>
          </MotionReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;







