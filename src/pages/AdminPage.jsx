import { Link } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import DashboardCard from "../components/admin/DashboardCard";
import { useProduct } from "../hooks/useProduct";
import { useAuth } from "../hooks/useAuth";

export default function AdminPage() {
  const { auth } = useAuth();
  const { shopProducts } = useProduct();

  return (
    <div className="container">
      <div className="row w-75 mx-auto py-5">
        <div className="col-4">
          <DashboardCard title="Usuarios" number={auth.users.length} />
        </div>
        <div className="col-4">
          <DashboardCard title="Ventas" number="4000" />
        </div>
        <div className="col-4">
          <DashboardCard title="Productos habilitados" number={shopProducts.length} />
        </div>
      </div>
      <div className="row w-75 mx-auto py-5">
        <div className="col-12 text-center text-primary mb-5">
          <h2 className="fw-bolder">ACCIONES RÁPIDAS</h2>
        </div>
        <div className="col-4 text-center">
          <Link
            to="/admin/products/new"
            className="btn btn-primary p-4 d-inline-flex gap-2 align-items-center justify-content-center"
          >
            <i>
              <PlusIcon className="icon" />
            </i>
            <span className="text-nowrap">Agregar producto</span>
          </Link>
        </div>
        <div className="col-4 text-center">
          <Link
            to="/admin/products"
            className="btn btn-outline-primary p-4 d-inline-flex gap-2 align-items-center justify-content-center"
          >
            <i>
              <PencilIcon className="icon" />
            </i>
            <span className="text-nowrap">Editar Producto</span>
          </Link>
        </div>
        <div className="col-4 text-center">
          <Link
            to="/admin/users"
            className="btn btn-primary p-4 d-inline-flex gap-2 align-items-center justify-content-center"
          >
            <i>
              <UserGroupIcon className="icon" />
            </i>
            <span className="text-nowrap">Gestionar Usuarios</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
