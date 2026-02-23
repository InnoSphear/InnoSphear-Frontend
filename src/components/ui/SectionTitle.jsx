import React from "react";

const SectionTitle = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.4em] text-cyan-300">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl text-white md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;








