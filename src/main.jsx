import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router.jsx";
// Normalize CSS
import "normalize.css";
// Importar SASS + Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Estilos CSS
import "./styles/main.css";
// Context API
import AppProviders from "./providers/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
);
