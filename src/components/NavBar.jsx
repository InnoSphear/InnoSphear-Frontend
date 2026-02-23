import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { publicLinks } from "../data/siteContent";
import Button from "./ui/Button";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40">
      <div className="glass mx-4 mt-4 rounded-2xl px-4 py-3 md:mx-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-semibold text-white">
              I
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                Innosphear
              </p>
              <p className="font-display text-lg text-white">Global IT Agency</p>
            </div>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {publicLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.18em] transition ${
                    isActive ? "text-cyan-300" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/client-login"
              className="text-sm font-semibold text-slate-300 hover:text-white"
            >
              Client Login
            </Link>
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-full border border-white/10 px-3 py-2 text-sm text-white"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open && (
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 lg:hidden">
            {publicLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.18em] text-slate-300"
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/client-login"
              className="text-sm font-semibold text-slate-300"
            >
              Client Login
            </Link>
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;








