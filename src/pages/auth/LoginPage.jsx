import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { auth, authDispatch } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto: Montaje de componente
  useEffect(() => {
    // Cargamos los usuarios del LocalStorage cuando se monta el componente.
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    authDispatch({ type: "load-users", payload: { users: storedUsers } });

    if(location.search.includes('302')) toast.error('Registrate o iniciá sesión', {autoClose: 1800})
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

  // Efecto: Ingreso OK
  useEffect(() => {
    if(auth.currentUser !== null){
      toast.success(`Que bueno verte ${auth.currentUser.usuario}`, {
        autoClose: 1000,
        onClose: () => {
          navigate('/');
        }
      })
    }
  }, [auth.currentUser])

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
      <p className="mb-4">Inicia sesión para tener acceso al sitio completo</p>
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

      <Link to="/auth/register" className="link-primary text-decoration-none">
        NO TENGO CUENTA
      </Link>
    </form>
  );
}
