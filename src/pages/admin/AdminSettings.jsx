import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/client";
import { useToast } from "../../components/ui/ToastProvider";

const emptyTestimonial = { quote: "", name: "", title: "" };

const AdminSettings = () => {
  const { push } = useToast();
  const [form, setForm] = useState({
    hero: { headline: "", subheadline: "", ctaLabel: "" },
    contact: { email: "", phone: "", address: "" },
    testimonials: [{ ...emptyTestimonial }],
  });

  const load = async () => {
    const res = await api.get("/settings");
    if (res.data.data) {
      const data = res.data.data;
      setForm({
        hero: data.hero || { headline: "", subheadline: "", ctaLabel: "" },
        contact: data.contact || { email: "", phone: "", address: "" },
        testimonials: data.testimonials?.length ? data.testimonials : [{ ...emptyTestimonial }],
      });
    }
  };

  useEffect(() => {
    load().catch(() => null);
  }, []);

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setForm((prev) => {
      const items = [...prev[section]];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [section]: items };
    });
  };

  const addItem = (section, emptyItem) => {
    setForm((prev) => ({ ...prev, [section]: [...prev[section], { ...emptyItem }] }));
  };

  const removeItem = (section, index) => {
    setForm((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    await api.put("/settings", form);
    push("Settings updated");
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-2xl text-white">Settings</h2>
        <p className="mt-2 text-sm text-slate-300">
          Edit hero content, testimonials, and contact info.
        </p>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Hero Section</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            value={form.hero?.headline || ""}
            onChange={(event) =>
              handleChange("hero", "headline", event.target.value)
            }
            placeholder="Headline"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <input
            value={form.hero?.ctaLabel || ""}
            onChange={(event) =>
              handleChange("hero", "ctaLabel", event.target.value)
            }
            placeholder="CTA label"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <textarea
            value={form.hero?.subheadline || ""}
            onChange={(event) =>
              handleChange("hero", "subheadline", event.target.value)
            }
            placeholder="Subheadline"
            rows={3}
            className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Testimonials</h3>
        <div className="mt-4 space-y-4">
          {form.testimonials.map((testimonial, index) => (
            <div key={`testimonial-${index}`} className="grid gap-4 md:grid-cols-3">
              <input
                value={testimonial.name}
                onChange={(event) => updateArrayItem("testimonials", index, "name", event.target.value)}
                placeholder="Name"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              />
              <input
                value={testimonial.title}
                onChange={(event) => updateArrayItem("testimonials", index, "title", event.target.value)}
                placeholder="Title"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              />
              <textarea
                value={testimonial.quote}
                onChange={(event) => updateArrayItem("testimonials", index, "quote", event.target.value)}
                placeholder="Quote"
                rows={3}
                className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
              />
              <div className="md:col-span-3 flex gap-2">
                <Button variant="dark" className="px-4" onClick={() => removeItem("testimonials", index)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button variant="dark" className="px-4" onClick={() => addItem("testimonials", emptyTestimonial)}>
            Add Testimonial
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-xl text-white">Contact Info</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <input
            value={form.contact?.email || ""}
            onChange={(event) =>
              handleChange("contact", "email", event.target.value)
            }
            placeholder="Email"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <input
            value={form.contact?.phone || ""}
            onChange={(event) =>
              handleChange("contact", "phone", event.target.value)
            }
            placeholder="Phone"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
          <input
            value={form.contact?.address || ""}
            onChange={(event) =>
              handleChange("contact", "address", event.target.value)
            }
            placeholder="Address"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none"
          />
        </div>
      </Card>

      <div>
        <Button onClick={handleSubmit}>Save Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;

