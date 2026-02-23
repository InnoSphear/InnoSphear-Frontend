import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-20 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">404</p>
        <h1 className="mt-4 font-display text-3xl text-white">Page not found</h1>
        <p className="mt-3 text-sm text-slate-300">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;








