import React from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import MotionReveal from "../components/MotionReveal";
import useServices from "../api/useServices";

const ServicesPage = () => {
  const { services } = useServices({ active: true, limit: 50 });
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Services"
          title="Integrated product delivery built for premium global brands."
          description="Every engagement is led by senior architects, designers, and engineers to ensure measurable outcomes."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <MotionReveal key={service._id}>
              <Card>
                <h3 className="font-display text-xl text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {(service.highlights || []).map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;



