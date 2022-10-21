import { ClientPrincipalContextProvider } from "@aaronpowell/react-static-web-apps-auth";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Nav from "./components/Nav";
import "./main.css";
import { main } from "./main.css";
import Doctor from "./pages/Doctor";
import Nurse from "./pages/Nurse";
import PatientDetails from "./pages/PatientDetails";
import PostLogin from "./pages/PostLogin";
import RecordSaved from "./pages/RecordSaved";
import SurgeryAdmin from "./pages/SurgeryAdmin";
import Upload from "./pages/Upload";
import Verify from "./pages/Verify";

const Layout = () => {
  return (
    <>
      <Nav />
      <section className={main}>
        <Outlet />
      </section>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Upload />} errorElement={<ErrorBoundary />} />
      <Route
        path="/verify/:id"
        element={<Verify />}
        errorElement={<ErrorBoundary />}
        loader={async ({ params }) => fetch(`/api/new-patient/${params.id}`)}
      />
      <Route
        path="/record-saved"
        element={<RecordSaved />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/post-login"
        element={<PostLogin />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/surgery/admin"
        element={<SurgeryAdmin />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/surgery/doctor"
        element={<Doctor />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/surgery/nurse"
        element={<Nurse />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/surgery/patient/:id"
        element={<PatientDetails />}
        errorElement={<ErrorBoundary />}
        loader={async ({ params }) => fetch(`/api/patient/${params.id}`)}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientPrincipalContextProvider>
      <RouterProvider router={router} />
    </ClientPrincipalContextProvider>
  </React.StrictMode>
);
