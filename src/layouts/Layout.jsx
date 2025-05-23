import { Outlet } from "react-router-dom";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <>
      <Heading />
      <Outlet />
      <Footer />
      <ToastContainer limit={3}/>
    </>
  );
}
