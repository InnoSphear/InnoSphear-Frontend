import React from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import MotionReveal from "../components/MotionReveal";
import Button from "../components/ui/Button";
import usePricing from "../api/usePricing";

const PricingPage = () => {
  const { pricing } = usePricing({ active: true, limit: 50 });
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionTitle
          eyebrow="Pricing"
          title="Engagements designed for premium outcomes."
          description="Choose a plan or request a tailored proposal based on your roadmap."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((plan) => (
            <MotionReveal key={plan._id}>
              <Card>
                <h3 className="font-display text-xl text-white">{plan.name}</h3>
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
    </div>
  );
};

export default PricingPage;


