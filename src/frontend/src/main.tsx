import { ClientPrincipalContextProvider } from "@aaronpowell/react-static-web-apps-auth";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import "./main.css";
import { main } from "./main.css";
import Nurse from "./pages/Nurse";
import PostLogin from "./pages/PostLogin";
import SurgeryAdmin from "./pages/SurgeryAdmin";
import Upload from "./pages/Upload";
import Verify from "./pages/Verify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Upload />,
  },
  {
    path: "/verify/:id",
    element: <Verify />,
    loader: async ({ params }) => {
      return fetch(`/api/new-patient/${params.id}`);
    },
  },
  {
    path: "/post-login",
    element: <PostLogin />,
  },
  {
    path: "/surgery/admin",
    element: <SurgeryAdmin />,
    loader: async () => fetch("/api/surgery/new-patients"),
  },
  {
    path: "/surgery/nurse",
    element: <Nurse />,
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
