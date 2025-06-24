import { useEffect, useMemo, useState } from "react";
import { UserIcon, KeyIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { auth, authDispatch } = useAuth();
  const navigate = useNavigate();

  // Efecto: Montaje de componente
  useEffect(() => {
    // Cargamos los usuarios del LocalStorage cuando se monta el componente.
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    authDispatch({ type: "load-users", payload: { users: storedUsers } });
  }, []);

  // Efecto: Error al registrar
  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error, {
        autoClose: 1500,
      });

      // Reiniciar errores
      authDispatch({ type: "clear-error" });
    }
  }, [auth.error]);

  useEffect(() => {
    if (auth.currentUser !== null) {
      toast.success(`Te damos la bienvenida ${auth.currentUser.username}`, {
        autoClose: 1200,
        onClose: () => {
          navigate("/");
        },
      });
    }
  }, [auth.currentUser]);

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    authDispatch({ type: "register", payload: { newUser } });
  };

  const isFormValid = useMemo(
    () =>
      newUser.email.trim() !== "" &&
      newUser.username.trim() !== "" &&
      newUser.password.trim() !== "",
    [newUser]
  );

  return (
    <form onSubmit={handleSubmit} className="form-login mx-auto">
      <div className="border border-light-subtle rounded-3 p-4 mb-5">
        <p className="p-0 m-0 fs-4">
          Queres ser admin? Tu nombre de usuario debe ser{" "}
          <span className="text-primary">Admin</span>
        </p>
      </div>
      <p className="mb-4">Registrate para poder acceder a nuestra tienda.</p>
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
          value={newUser.email}
          className="d-block text-light bg-transparent border-0 flex-grow-1"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="visible-addon"
          aria-required
          required
        />
      </div>

      <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-4">
        <label
          htmlFor="inputUsuario"
          className="ps-3 pe-2 d-flex justify-content-center align-items-center"
        >
          <UserIcon className="icon" />
        </label>
        <input
          type="text"
          name="username"
          id="inputUsuario"
          onChange={handleChange}
          value={newUser.usuario}
          className="d-block text-light bg-transparent border-0 flex-grow-1"
          placeholder="Usuario"
          aria-label="Usuario"
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
          value={newUser.password}
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
        value="Registrarse"
        disabled={!isFormValid}
        className="text-uppercase btn btn-lg btn-primary w-100 mb-3"
      />

      <Link to="/auth/login" className="link-primary text-decoration-none">
        YA TENGO CUENTA
      </Link>
    </form>
  );
}
