import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  HomeIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
  UsersIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

import AdminSidebar, {
  AdminSidebarItem,
} from "../components/admin/AdminSidebar";
import { useTheme } from "../hooks/useTheme";

export default function AdminLayout() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className="admin-layout-wrapper">
        <AdminSidebar>
          <AdminSidebarItem
            to="/"
            text="Volver al sitio"
            icon={<HomeIcon className="icon" />}
          />
          <AdminSidebarItem
            to="/admin/dashboard"
            text="Dashboard"
            icon={<RectangleGroupIcon className="icon" />}
          />
          <AdminSidebarItem
            to="/admin/products"
            text="Productos"
            icon={<ArchiveBoxIcon className="icon" />}
          />
          <AdminSidebarItem
            to="/admin/products/new"
            text="Agregar Producto"
            icon={<PlusCircleIcon className="icon" />}
          />
          <AdminSidebarItem
            to="/admin/users"
            text="Usuarios"
            icon={<UsersIcon className="icon" />}
          />
        </AdminSidebar>
        <main className={darkMode ? "bg-dark-subtle" : "bg-light"}>
          <div className="container py-5 px-5">
            <Outlet />
          </div>
        </main>
      </div>
      <ToastContainer limit={1} />
    </>
  );
}
