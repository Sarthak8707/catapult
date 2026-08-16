import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import AuditTrails from "./pages/AuditTrail";
import Analytics from "./pages/Analytics";
import Flags from "./pages/Flags";
import OrganizationDetails from "./pages/OrganizationDetails";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import EnvironmentDetails from "./pages/EnvironmentDetails";
import FlagDetails from "./pages/FlagDetails";
import Guardrails from "./pages/Guardrails";
import Segments from "./pages/Segments";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="audit-trails" element={<AuditTrails />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="flags" element={<Flags />} />
        <Route path="organizations/:id" element={<OrganizationDetails />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="projects/:id/guardrails" element={<Guardrails />} />
        <Route path="environments/:id" element={<EnvironmentDetails />} />
        <Route path="flags/:id" element={<FlagDetails />} />
        <Route path="projects/:id/segments" element={<Segments />} />
      </Route>
    </Routes>
  );
}