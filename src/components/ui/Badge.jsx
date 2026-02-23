import React from "react";

const Badge = ({ children }) => {
  return (
    <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
      {children}
    </span>
  );
};

export default Badge;








