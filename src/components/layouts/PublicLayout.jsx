import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Background from "../Background";
import ScrollToTop from "../ScrollToTop";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-aurora">
      <ScrollToTop />
      <Background />
      <NavBar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;








