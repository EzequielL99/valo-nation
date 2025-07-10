/* ---------------------------------- EMLV ---------------------------------- */
import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={darkMode ? "bg-dark-subtle text-white" : "bg-dark text-light"}
    >
      <div className="container py-4 text-center">
        EMLV - Todos los derechos reservados {new Date().getFullYear()}
      </div>
    </footer>
  );
}
