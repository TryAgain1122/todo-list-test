import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import ContextProvider from "./context/ContextProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <Toaster />
      <App />
    </ContextProvider>
  </StrictMode>
);
