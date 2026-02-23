import React from "react";

const Background = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -left-40 top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-500/20 blur-[140px]" />
    </div>
  );
};

export default Background;








