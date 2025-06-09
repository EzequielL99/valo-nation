import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  HomeIcon,
  ArchiveBoxIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  SparklesIcon,
  UsersIcon,
  ChevronDoubleLeftIcon,
  RectangleGroupIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import Footer from "../components/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <>
      <div className="admin-layout-wrapper">
        <AdminSidebar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <ToastContainer limit={3} />
    </>
  );
}
