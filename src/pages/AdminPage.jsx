import { Link } from "react-router-dom";
import {
  PlusIcon,
  PencilIcon,
  NoSymbolIcon
} from "@heroicons/react/24/outline";
import DashboardCard from "../components/admin/DashboardCard";

export default function AdminPage() {
  return (
    <div className="container">
      <div className="row w-75 mx-auto py-5">
        <div className="col-4">
          <DashboardCard title="Usuarios" number="400" />
        </div>
        <div className="col-4">
          <DashboardCard title="Ventas" number="4000" />
        </div>
        <div className="col-4">
          <DashboardCard title="Productos" number="19" />
        </div>
      </div>
      <div className="row w-75 mx-auto py-5">
        <div className="col-12 text-center text-primary mb-4">
          <h2 className="fw-bolder">ACCIONES RÁPIDAS</h2>
        </div>
        <div className="col-4 text-center">
          <Link to='/admin/products/add' className="btn btn-success d-inline-flex gap-2 align-items-center">
            <i><PlusIcon className="icon" /></i>
            <span className="fs-2">Agregar producto</span>
          </Link>
        </div>
        <div className="col-4 text-center">
          <Link to='/admin/products' className="btn btn-info text-light d-inline-flex gap-2 align-items-center">
            <i><PencilIcon className="icon" /></i>
            <span className="fs-2">Editar Producto</span>
          </Link>
        </div>
        <div className="col-4 text-center">
          <Link to='/admin/products' className="btn btn-outline-danger d-inline-flex gap-2 align-items-center">
            <i><NoSymbolIcon className="icon" /></i>
            <span className="fs-2">Bloquear Producto</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
