import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="min-vh-100 container-fluid bg-dark justify-content-center align-content-center">
        <div className="container text-center text-light">
          <h1>
            <span className="fw-bold text-primary">VALO</span>-NATION
          </h1>
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer limit={3}/>
    </>
  );
}
