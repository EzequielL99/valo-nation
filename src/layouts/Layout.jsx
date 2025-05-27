import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer limit={3}/>
    </>
  );
}
