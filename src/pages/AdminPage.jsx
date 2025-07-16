import { Link } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import DashboardCard from "../components/admin/DashboardCard";
import { useProduct } from "../hooks/useProduct";
import { useAuth } from "../hooks/useAuth";
import { Helmet } from "react-helmet";

export default function AdminPage() {
  const { users } = useAuth();
  const { shopProducts } = useProduct();

  return (
    <>
      <Helmet>
        <title>Administracion | Dashboard</title>
        <meta name="description" content="Panel de administración principal" />
      </Helmet>
      <div className="row">
        <div className="col-12 text-center text-primary mb-2">
          <h2 className="fw-bolder">DASHBOARD</h2>
        </div>
      </div>
      <div className="row bo-dashboard-cards mx-auto py-5">
        <div className="col-12 col-md-4">
          <DashboardCard title="Usuarios" number={users.length} />
        </div>
        <div className="col-12 col-md-4">
          <DashboardCard title="Ventas" number="4000" />
        </div>
        <div className="col-12 col-md-4">
          <DashboardCard
            title="Productos habilitados"
            number={shopProducts.length}
          />
        </div>
      </div>
      <div className="row mx-auto py-5">
        <div className="col-12 text-center text-primary mb-5">
          <h2 className="fw-bolder">ACCIONES RÁPIDAS</h2>
        </div>
        <div className="col-md-4 text-center">
          <Link
            to="/admin/products/new"
            className="btn btn-primary p-4 mb-4 d-inline-flex gap-2 align-items-center justify-content-center"
            aria-label="Crear producto para la tienda"
          >
            <i>
              <PlusIcon className="icon" />
            </i>
            <span className="text-nowrap">Agregar producto</span>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link
            to="/admin/products"
            className="btn btn-outline-primary mb-4 p-4 d-inline-flex gap-2 align-items-center justify-content-center"
            aria-label="Editar productos de la tienda"
          >
            <i>
              <PencilIcon className="icon" />
            </i>
            <span className="text-nowrap">Editar Producto</span>
          </Link>
        </div>
        <div className="col-md-4 text-center">
          <Link
            to="/admin/users"
            className="btn btn-primary mb-4 p-4 d-inline-flex gap-2 align-items-center justify-content-center"
            aria-label="Gestionar usuarios de la tienda"
          >
            <i>
              <UserGroupIcon className="icon" />
            </i>
            <span className="text-nowrap">Gestionar Usuarios</span>
          </Link>
        </div>
      </div>
    </>
  );
}
