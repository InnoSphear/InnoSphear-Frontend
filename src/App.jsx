import React from "react";
import { Route, Routes } from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import PricingPage from "./pages/PricingPage";
import CareersPage from "./pages/CareersPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import ClientLoginPage from "./pages/ClientLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClients from "./pages/admin/AdminClients";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminTasks from "./pages/admin/AdminTasks";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminDeals from "./pages/admin/AdminDeals";
import AdminServices from "./pages/admin/AdminServices";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminCaseStudies from "./pages/admin/AdminCaseStudies";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminFinance from "./pages/admin/AdminFinance";
import AdminExpenses from "./pages/admin/AdminExpenses";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./components/auth/RequireAuth";
import RequireRole from "./components/auth/RequireRole";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/client-login" element={<ClientLoginPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="tasks" element={<AdminTasks />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="deals" element={<AdminDeals />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="pricing" element={<AdminPricing />} />
        <Route path="case-studies" element={<AdminCaseStudies />} />
        <Route
          path="careers"
          element={
            <RequireRole roles={["super_admin", "admin", "hr"]}>
              <AdminCareers />
            </RequireRole>
          }
        />
        <Route
          path="blog"
          element={
            <RequireRole roles={["super_admin", "admin"]}>
              <AdminBlog />
            </RequireRole>
          }
        />
        <Route
          path="finance"
          element={
            <RequireRole roles={["super_admin", "admin"]}>
              <AdminFinance />
            </RequireRole>
          }
        />
        <Route
          path="expenses"
          element={
            <RequireRole roles={["super_admin", "admin"]}>
              <AdminExpenses />
            </RequireRole>
          }
        />
        <Route
          path="team"
          element={
            <RequireRole roles={["super_admin", "admin"]}>
              <AdminTeam />
            </RequireRole>
          }
        />
        <Route
          path="settings"
          element={
            <RequireRole roles={["super_admin", "admin"]}>
              <AdminSettings />
            </RequireRole>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;








