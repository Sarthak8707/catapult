import { Routes, Route } from "react-router-dom";
import Layout, { FullLayout } from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import AuditTrails from "./pages/AuditTrail";
import Analytics from "./pages/Analytics";
import Flags from "./pages/Flags";
import OrganizationDetails from "./pages/OrganizationDetails";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import FlagDetails from "./pages/FlagDetails";
import Guardrails from "./pages/Guardrails";
import Segments from "./pages/Segments";
import SegmentDetails from "./pages/SegmentDetails";
import GuardrailDetails from "./pages/GuardrailDetails";
import Members from "./pages/Members";
import Invitations from "./pages/Invitations";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <Route path="projects/:projectID" element={<ProjectDetails />} />
        <Route path="projects/:projectID/guardrails" element={<Guardrails />} />
        <Route path="projects/:projectID/flags/:flagID" element={<FlagDetails />} />
        <Route path="projects/:projectID/segments" element={<Segments />} />
        <Route path="projects/:projectID/segments/:segmentID" element={<SegmentDetails />} />
        <Route path="projects/:projectID/guardrails/:guardrailID" element={<GuardrailDetails />} />
        <Route path="projects/:projectID/members" element={<Members />} />
        <Route path="invitations" element={<Invitations />} />
        
      </Route>

      <Route path="/" element={<FullLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}