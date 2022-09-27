import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
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
      return fetch(`/api/new-patient/${params.id}`)
    }
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
