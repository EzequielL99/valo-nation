import { HandRaisedIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <section className="container text-center min-vh-100 d-grid align-items-center justify-content-center">
      <div>
        <i className="d-block mb-4 h1">
          <HandRaisedIcon className="text-primary w-50" />
        </i>
        <p className="mb-4">
          Acceso restringido. Puedes volver al sitio principal por aquí
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Volver al sitio
        </Link>
      </div>
    </section>
  );
}
