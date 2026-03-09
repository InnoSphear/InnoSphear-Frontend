import React from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Badge from "../components/ui/Badge";
import MotionReveal from "../components/MotionReveal";
import useSettings from "../api/useSettings";
import useBlogs from "../api/useBlogs";
import useServices from "../api/useServices";
import usePricing from "../api/usePricing";
import useCaseStudies from "../api/useCaseStudies";

const HomePage = () => {
  const { settings } = useSettings();
  const { services } = useServices({ active: true, limit: 6 });
  const { pricing } = usePricing({ active: true, limit: 3 });
  const { caseStudies } = useCaseStudies({ active: true, limit: 3 });
  const testimonials = settings?.testimonials || [];
  const { blogs } = useBlogs({ status: "published", limit: 3 });

  return (
    <div>
      <section className="relative px-6 pt-16 md:px-12 md:pt-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-6">
            <Badge>Global Digital Agency</Badge>
            <h1 className="font-display text-4xl leading-tight text-white md:text-6xl">
              {settings?.hero?.headline ||
                "We build premium, animated digital experiences for the next era of enterprise."}
            </h1>
            <p className="max-w-2xl text-base text-slate-300 md:text-lg">
              {settings?.hero?.subheadline ||
                "Innosphear is a senior full-stack product studio for ambitious organizations."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact">Book a Strategy Call</Button>
              <Button href="/portfolio" variant="ghost">
                View Case Studies
              </Button>
              <Button
                href="https://wa.me/916203818011?text=Hi%20I%20would%20like%20to%20book%20a%20strategy%20call%20with%20Innosphear."
                target="_blank"
              >
                Send WhatsApp Text
              </Button>
            </div>
          </div>

          <MotionReveal>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Launch Velocity
                </p>
                <p className="mt-4 text-3xl font-semibold text-white">
                  8-12 weeks
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Time to ship a production-grade platform.
                </p>
              </Card>
              <Card>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Global Delivery
                </p>
                <p className="mt-4 text-3xl font-semibold text-white">24/7</p>
                <p className="mt-2 text-sm text-slate-300">
                  Distributed teams across four hubs.
                </p>
              </Card>
              <Card>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Client Retention
                </p>
                <p className="mt-4 text-3xl font-semibold text-white">94%</p>
                <p className="mt-2 text-sm text-slate-300">
                  Long-term partnerships after launch.
                </p>
              </Card>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Services"
            title="Full-stack execution with premium design and measurable growth."
            description="From product strategy to scalable engineering, we deliver global-ready systems and digital campaigns that convert."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <MotionReveal key={service._id}>
                <Card>
                  <h3 className="font-display text-2xl text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(service.highlights || []).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Case Studies"
            title="We design for impact, then engineer for scale."
            description="Every engagement is built around measurable outcomes. See how global teams partner with Innosphear."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <MotionReveal key={study._id}>
                <Card className="h-full">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {study.category}
                  </p>
                  <h3 className="mt-4 font-display text-xl text-white">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300">{study.summary}</p>
                  <p className="mt-6 text-sm font-semibold text-cyan-300">
                    {study.metrics}
                  </p>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted by teams who demand precision and polish."
            description="We move fast, stay collaborative, and sweat the details that make your product feel inevitable."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <MotionReveal>
              <Card className="h-full">
                <p className="text-sm text-slate-300">
                  As CEO, my vision is not just to build a company, but to
                  build solutions that create real impact, drive innovation, and
                  empower businesses to grow beyond limits.
                </p>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">
                    Ujjwal Karmakar
                  </p>
                  <p className="text-xs text-slate-400">CEO</p>
                </div>
              </Card>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Pricing"
            title="Flexible engagement models for product teams at every stage."
            description="Choose a plan or build a custom scope with our architects."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricing.map((plan) => (
              <MotionReveal key={plan._id}>
                <Card className="h-full">
                  <h3 className="font-display text-xl text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-3xl text-white">{plan.price}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {plan.cycle}
                  </p>
                  <p className="mt-4 text-sm text-slate-300">{plan.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {(plan.features || []).map((feature) => (
                      <li key={feature}>- {feature}</li>
                    ))}
                  </ul>
                  <Button href="/contact" className="mt-6" variant="dark">
                    Start with {plan.name}
                  </Button>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Insights"
            title="Executive insights from the Innosphear leadership team."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogs.map((post) => (
              <MotionReveal key={post._id}>
                <Card className="h-full">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {post.status}
                  </p>
                  <h3 className="mt-4 font-display text-lg text-white">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-xs text-slate-400">
                    {new Date(post.createdAt).toDateString()}
                  </p>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-10 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="glass rounded-3xl p-10 md:p-16">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Ready to build
                </p>
                <h2 className="mt-4 font-display text-3xl text-white md:text-4xl">
                  Partner with Innosphear for your next global launch.
                </h2>
                <p className="mt-4 text-sm text-slate-300">
                  Schedule a discovery session with our senior architects.
                </p>
              </div>
              <Button href="/contact">Start the conversation</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
