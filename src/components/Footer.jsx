import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-black/40 px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-xl text-white">Innosphear</p>
          <p className="mt-4 text-sm text-slate-400">
            Premium global IT agency crafting high-impact digital experiences.
          </p>
        </div>
        <div className="flex flex-col space-y-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Company</p>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Case Studies</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div className="flex flex-col space-y-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Resources</p>
          <Link to="/blog">Blog</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/client-login">Client Login</Link>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Global</p>
          <p>Kishanganj Ruidhasha (Bihar)</p>
          <p className="text-slate-400">innosphear@gmail.com</p>
          <p className="text-slate-400">+91 6203818011</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl text-xs text-slate-500">
        (c) 2026 Innosphear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;








