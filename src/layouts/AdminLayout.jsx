import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "../components/Footer";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <Outlet />
      <Footer />
      <ToastContainer limit={3} />
    </>
  );
}
