import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Helmet } from "react-helmet";

export default function NotFoundPage() {
  const { darkMode } = useTheme();

  return (
    <main className="page-404">
      <Helmet>
        <title>Página no encontrada</title>
        <meta
          name="description"
          content="No se encontró la página solicitada."
        />
      </Helmet>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <EyeSlashIcon className="mx-auto icon mb-4 text-primary" />
          <p
            className={`${
              darkMode ? "text-light" : "text-dark"
            } fs-2 fw-bold mb-5`}
          >
            Oops! No pudimos encontrar la página que estas buscando
          </p>
          <Link to="/" className="btn btn-primary fs-3 px-5 py-3">
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
