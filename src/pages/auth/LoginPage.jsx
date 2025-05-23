import { useState, useMemo, useEffect } from "react";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useValoNation } from "../../hooks/useValoNation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { auth, authDispatch } = useValoNation();
  const navigate = useNavigate();

  // Efecto: Montaje de componente
  useEffect(() => {
    // Cargamos los usuarios del LocalStorage cuando se monta el componente.
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    authDispatch({ type: "load-users", payload: { users: storedUsers } });
  }, []);

  // Efecto: Error al ingresar
  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error, {
        autoClose: 1500,
      });

      // Reiniciar errores
      authDispatch({ type: "clear-error" });
    }
  }, [auth.error]);

  // Efecto: Usuario registrado con exito
  useEffect(() => {
    if (auth.currentUser !== null) {
      toast.success(`Bienvenido ${auth.currentUser.usuario}`, {
        autoClose: 2000,
        onClose: () => navigate("/shop"),
      });
    }
  }, [auth.currentUser]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    authDispatch({ type: "login", payload: { userData } });
  };

  const isFormValid = useMemo(
    () => userData.email.trim() !== "" && userData.password.trim() !== "",
    [userData]
  );

  return (
    <form onSubmit={handleSubmit} className="form-login mx-auto">
      <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-4">
        <label
          htmlFor="inputEmail"
          className="ps-3 pe-2 d-flex justify-content-center align-items-center"
        >
          <EnvelopeIcon className="icon" />
        </label>
        <input
          type="email"
          name="email"
          id="inputEmail"
          onChange={handleChange}
          className="d-block text-light bg-transparent border-0 flex-grow-1"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="visible-addon"
          aria-required
          autoComplete="off"
          required
        />
      </div>

      <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-4">
        <label
          htmlFor="inputPassword"
          className="ps-3 pe-2 d-flex justify-content-center align-items-center"
        >
          <KeyIcon className="icon" />
        </label>
        <input
          type="password"
          name="password"
          id="inputPassword"
          onChange={handleChange}
          className="d-block text-light bg-transparent border-0 flex-grow-1"
          placeholder="Contraseña"
          aria-label="Contraseña"
          aria-describedby="visible-addon"
          aria-required
          required
        />
      </div>

      <input
        type="submit"
        value="Ingresar"
        disabled={!isFormValid}
        className="text-uppercase btn btn-lg btn-primary w-100 mb-3"
      />

      <Link to="/auth/register" className="text-white-50 text-decoration-none">
        NO TENGO CUENTA
      </Link>
    </form>
  );
}
