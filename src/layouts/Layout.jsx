import { Outlet } from "react-router-dom";
import Heading from "../components/Heading";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <Heading />
      <Outlet />
      <Footer />
    </>
  );
}
