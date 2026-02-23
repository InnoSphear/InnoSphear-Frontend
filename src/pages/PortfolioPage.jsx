import React from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import MotionReveal from "../components/MotionReveal";
import useCaseStudies from "../api/useCaseStudies";

const PortfolioPage = () => {
  const { caseStudies } = useCaseStudies({ active: true, limit: 50 });

  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Portfolio"
          title="Global launches designed for impact."
          description="Select case studies across fintech, healthcare, logistics, and SaaS."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <MotionReveal key={study._id}>
              <Card>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {study.category}
                </p>
                <h3 className="mt-4 font-display text-xl text-white">
                  {study.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  {study.summary}
                </p>
                <p className="mt-6 text-sm font-semibold text-cyan-300">
                  {study.metrics}
                </p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;


