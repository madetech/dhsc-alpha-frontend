import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./globals.scss";
import LoadingPage from "./pages/loading-page/LoadingPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingPage />} />
  </StrictMode>
);
