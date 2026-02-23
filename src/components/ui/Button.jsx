import React from "react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 text-slate-900 shadow-[0_12px_30px_rgba(14,165,233,0.3)]",
  ghost: "border border-white/15 text-white hover:bg-white/10",
  dark: "bg-white/10 text-white hover:bg-white/20",
};

const Button = ({ href, variant = "primary", className = "", children, ...props }) => {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition ${
    variants[variant]
  } ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;








