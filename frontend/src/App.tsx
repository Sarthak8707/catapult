import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout, { FullLayout } from "./components/Layout";
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
import Landing from "./pages/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      
      {
        path: "organizations",
        element: <Organizations />,
      },
      {
        path: "organizations/:id",
        element: <OrganizationDetails />,
      },
      {
        path: "audit-trails",
        element: <AuditTrails />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "flags",

        element: <Flags />,
      },

      {
        path: "projects",
        handle: {breadcrumb: "Projects"},
        children: [

          {
            index: true,
            element: <Projects />,
            // handle: { breadcrumb: "Projects" }
          },

          {
            path: ":projectID",
            handle: {breadcrumb: "Project Name"},
            children: [
              {
                index: true,
                element: <ProjectDetails />,
                handle: { breadcrumb: "Project flags" }
              },
              {
                path: "guardrails",
                element: <Guardrails />,
                handle: { breadcrumb: "Project guardrails" }
              },
              {
                path: "flags/:flagID",
                element: <FlagDetails />,
              },
              {
                path: "segments",
                element: <Segments />,
                handle: { breadcrumb: "Project segments" }
              },
              {
                path: "segments/:segmentID",
                element: <SegmentDetails />,
              },
              {
                path: "guardrails/:guardrailID",
                element: <GuardrailDetails />,
              },
              {
                path: "members",
                element: <Members />,
                handle: { breadcrumb: "Project members" }
              },
            ]
          },


        ]
      },

      {
        path: "invitations",
        element: <Invitations />,
      },
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      {
        path: "home",
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}