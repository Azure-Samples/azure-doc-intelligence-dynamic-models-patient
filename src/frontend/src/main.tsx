import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import "./main.css";
import Upload from "./pages/Upload";
import Verify from "./pages/Verify";
import { ClientPrincipalContextProvider } from "@aaronpowell/react-static-web-apps-auth";
import { main } from "./main.css";

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
