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
import MobileNavMenu, { MobileNavMenuItem } from "../components/MobileNavMenu";
import AdminHeader from "../components/admin/AdminHeader";

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
        <AdminHeader />
        <main className={`${darkMode ? "bg-dark-subtle" : "bg-white"} min-vh-100`}>
          <div className="container p-lg-5 py-5">
            <Outlet />
          </div>
        </main>
        <MobileNavMenu>
          <MobileNavMenuItem icon={<HomeIcon />} text='Ir al sitio' url='/' />
          <MobileNavMenuItem icon={<ArchiveBoxIcon />} text='Productos' url='/admin/products' />
          <MobileNavMenuItem icon={<RectangleGroupIcon />} text='Dashboard' url='/admin/dashboard' />
          <MobileNavMenuItem icon={<PlusCircleIcon />} text='Agregar Producto' url='/admin/products/new' />
          <MobileNavMenuItem icon={<UsersIcon />} text='Usuarios' url='/admin/users' />
        </MobileNavMenu>
      </div>
      <ToastContainer limit={1} />
    </>
  );
}
