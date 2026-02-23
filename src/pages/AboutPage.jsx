import React from "react";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import MotionReveal from "../components/MotionReveal";

const AboutPage = () => {
  return (
    <div className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionTitle
          eyebrow="About Innosphear"
          title="Global product engineers, designers, and strategists."
          description="We operate as a senior extension of your team, blending business strategy with premium design and scalable engineering."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Mission",
              copy: "Deliver world-class digital experiences that elevate brands and accelerate growth.",
            },
            {
              title: "Vision",
              copy: "Be the most trusted global partner for premium IT delivery.",
            },
            {
              title: "Values",
              copy: "Clarity, craftsmanship, velocity, and client-first execution.",
            },
          ].map((item) => (
            <MotionReveal key={item.title}>
              <Card>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{item.copy}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;








