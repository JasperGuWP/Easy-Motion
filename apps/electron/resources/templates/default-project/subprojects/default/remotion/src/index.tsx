import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RemotionRoot } from "./Root";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <RemotionRoot />
  </StrictMode>
);
