import { ClientPrincipalContextProvider } from "@aaronpowell/react-static-web-apps-auth";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";
import "./main.css";
import { main } from "./main.css";
import Doctor from "./pages/Doctor";
import Nurse from "./pages/Nurse";
import PatientDetails from "./pages/PatientDetails";
import PostLogin from "./pages/PostLogin";
import SurgeryAdmin from "./pages/SurgeryAdmin";
import Upload from "./pages/Upload";
import Verify from "./pages/Verify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Upload />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/verify/:id",
    element: <Verify />,
    loader: async ({ params }) => {
      return fetch(`/api/new-patient/${params.id}`);
    },
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/post-login",
    element: <PostLogin />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/surgery/admin",
    element: <SurgeryAdmin />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/surgery/nurse",
    element: <Nurse />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/surgery/doctor",
    element: <Doctor />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/surgery/patient/:id",
    element: <PatientDetails />,
    loader: async ({ params }) => fetch(`/api/patient/${params.id}`),
    errorElement: <ErrorBoundary />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientPrincipalContextProvider>
      <>
        <Nav />
        <section id="main" className={main}>
          <RouterProvider router={router} />
        </section>
      </>
    </ClientPrincipalContextProvider>
  </React.StrictMode>
);
