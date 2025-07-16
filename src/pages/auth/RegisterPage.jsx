import { useEffect, useMemo, useState, useRef } from "react";
import { UserIcon, KeyIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";
import FormErrorMessage from "../../components/FormErrorMessage";
import { Helmet } from "react-helmet";

const validateForm = (formData) => {
  let errors = {};

  if (formData.username.trim() === "")
    errors.username = "El usuario no puede estar vacío";

  if (formData.email.trim() === "")
    errors.email = "El correo no puede estar vacío";

  if (formData.password.trim() === "") {
    errors.password = "La contraseña no puede estar vacía";
  } else if (formData.password.length < 5) {
    errors.password = "La contraseña debe poseer al menos 5 caracteres";
  }

  return errors;
};

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const registeredUser = useRef(null);

  const { register, login, users } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (registeredUser.current) {
      // LOGIN
      const response = login(registeredUser.current);
      if (response.success)
        toast.success(`Hola ${registeredUser.current.username}`, {
          autoClose: 1000,
          onClose: () => navigate("/"),
        });
    }
  }, [users]);

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validacion
    const validationErrors = validateForm(newUser);

    // Control de errores
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Todo OK para Registro
    setErrors({});

    let response = register(newUser);

    if (response.success) {
      // Registro OK
      registeredUser.current = newUser;
    } else {
      toast.error(response.error, {
        autoClose: 1000,
      });
    }
  };

  const isFormValid = useMemo(
    () =>
      newUser.email.trim() !== "" &&
      newUser.username.trim() !== "" &&
      newUser.password.trim() !== "",
    [newUser]
  );

  return (
    <form onSubmit={handleSubmit} className="form-login mx-auto" noValidate>
      <Helmet>
        <title>Registrarse</title>
        <meta name="description" content="Registrate para acceder al catálogo de Valo-Nation"/>
      </Helmet>
      <div className="border border-light-subtle rounded-3 p-4 mb-5">
        <p className="p-0 m-0 fs-4">
          Queres ser admin? Tu nombre de usuario debe ser{" "}
          <span className="text-primary">Admin</span>
        </p>
      </div>
      <p className="mb-4">Registrate para poder acceder a nuestra tienda.</p>
      <div className="text-start mb-3">
        <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-1">
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
          />
        </div>
        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </div>

      <div className="text-start mb-3">
        <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-1">
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
          />
        </div>
        {errors.username && (
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        )}
      </div>

      <div className="text-start mb-3">
        <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-1">
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
            autoComplete="off"
          />
        </div>
        {errors.password && (
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Registrarse"
        disabled={!isFormValid}
        className="text-uppercase btn btn-lg btn-primary w-100 mb-3"
      />

      <Link to="/auth/login" className="link-primary text-decoration-none" aria-label="Ya tengo una cuenta. Iniciar sesión.">
        YA TENGO CUENTA
      </Link>
    </form>
  );
}
