import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";
import FormErrorMessage from "../../components/FormErrorMessage";

import { useAuth } from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const validateForm = (formData) => {
  let errors = {};

  if (formData.email.trim() === "")
    errors.email = "El correo no puede estar vacío";

  if (formData.password.trim() === "") {
    errors.password = "La contraseña no puede estar vacía";
  } else if (formData.password.length < 5) {
    errors.password = "La contraseña debe poseer al menos 5 caracteres";
  }

  return errors;
};

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { auth, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Efecto: Montaje de componente
  useEffect(() => {
    if (location.search.includes("302"))
      toast.error("Registrate o iniciá sesión", { autoClose: 1800 });
  }, []);

  // Efecto: LOGIN OK
  useEffect(() => {
    if (auth.currentUser) {
      toast.success(`Hola ${auth.currentUser.username}`, {
        autoClose: 1000,
        onClose: () => navigate("/"),
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

    // Validacion
    const validationErrors = validateForm(userData);

    // Errores
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Todo OK para intentar LOGIN
    setErrors({});

    const response = login(userData);

    if (!response.success) {
      toast.error(response.error, {
        autoClose: 1200,
      });
    }
  };

  const isFormValid = useMemo(
    () => userData.email.trim() !== "" && userData.password.trim() !== "",
    [userData]
  );

  return (
    <form onSubmit={handleSubmit} className="form-login mx-auto" noValidate>
      <Helmet>
        <title>Iniciar Sesión</title>
        <meta name="description" content="Inicia sesión en el sitio web de Valo-Nation"/>
      </Helmet>
      <p className="mb-4">Inicia sesión para tener acceso al sitio completo</p>
      <div className="text-start mb-4">
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
            className="d-block text-light bg-transparent border-0 flex-grow-1"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="visible-addon"
            aria-required
            autoComplete="off"
          />
        </div>
        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
      </div>

      <div className="text-start mb-4">
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
        value="Ingresar"
        disabled={!isFormValid}
        className="text-uppercase btn btn-lg btn-primary w-100 mb-3"
        aria-label="Iniciar Sesión"
      />

      <Link to="/auth/register" className="link-primary text-decoration-none" aria-label="No tengo cuenta. Crear una.">
        NO TENGO CUENTA
      </Link>
    </form>
  );
}
