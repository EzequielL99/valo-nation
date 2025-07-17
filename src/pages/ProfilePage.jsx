import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import FormErrorMessage from "../components/FormErrorMessage";
import { toast } from "react-toastify";
import { useTheme } from "../hooks/useTheme";
import { Helmet } from "react-helmet";

const formInitialState = {
  email: "",
  username: "",
  password: "",
};

const validateForm = (formData) => {
  const errors = {};

  // Validacion: username
  if (formData.username.trim() === "")
    errors.username = "El nombre de usuario no puede estar vacío";

  // Validacion: email
  if (formData.email.trim() === "")
    errors.email = "El correo de usuario no puede estar vacío";

  // Validacion: password
  if (formData.password.trim() === "") {
    errors.password = "La contraseña no puede estar vacía";
  } else if (formData.password.trim().length < 5) {
    errors.password = "La contraseña debe poseer más de 5 caracteres";
  }

  return errors;
};

export default function ProfilePage() {
  const { auth, users, updateUserData } = useAuth();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState(formInitialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({
      username: auth.currentUser.username,
      email: auth.currentUser.email,
      password: auth.currentUser.password,
    });
  }, []);

  const handleBlur = (e) => {
    // Remover KEY email
    let updatedErrors = {};

    Object.keys(errors)
      .filter((key) => key !== "email")
      .forEach((key) => (updatedErrors[key] = errors[key]));

    if (
      users.some(
        (user) =>
          user.email === e.target.value.trim() &&
          user.email !== auth.currentUser.email
      )
    ) {
      updatedErrors.email =
        "El correo ya existe. Por favor, ingresa uno diferente";
    }

    setErrors(updatedErrors);
  };

  const handleShowPassword = (e) => {
    e.preventDefault();

    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Limpiar errores
    setErrors({});

    // Actualizar Datos del Usuario
    const response = updateUserData(formData);

    if (response.success) {
      toast.success("Datos actualizados correctamente!", {
        autoClose: 1200,
      });
    } else {
      toast.error(response.error, {
        autoClose: 1200,
      });
    }
  };

  const isFormValid = useMemo(() => {
    const errors = validateForm(formData);

    if (Object.keys(errors).length != 0) {
      return false;
    }

    return (
      formData.email.trim() !== auth.currentUser.email ||
      formData.username.trim() !== auth.currentUser.username ||
      formData.password.trim() !== auth.currentUser.password
    );
  }, [formData, errors, auth.currentUser]);

  return (
    <div className="container min-vh-100 profile-page d-flex justify-content-center align-items-center">
      <Helmet>
        <title>Mi Perfil</title>
        <meta name="description" content="Perfil del usuario" />
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className={`${
          darkMode ? "bg-dark-subtle text-white" : "bg-white text-dark"
        } position-relative rounded-4 shadow p-5 mx-auto`}
      >
        <h1 className="mb-3 text-primary text-center text-md-start text-uppercase">
          Tu PERFIL
        </h1>
        <p className="description text-center text-md-start mb-5">
          Esta es la información con la cual te registraste a nuestro sitio.
          Podés modificar ciertos datos si lo crees conveniente.
        </p>

        <div className="input-group mb-4 d-flex flex-column gap-2">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${
              darkMode
                ? "border-dark-subtle bg-dark"
                : "border-dark bg-light-subtle"
            } border border-3 rounded-3 px-3 py-2`}
            placeholder="correo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formData.email}
            required
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </div>

        <div className="input-group mb-4 d-flex flex-column gap-2">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            className={`${
              darkMode
                ? "border-dark-subtle bg-dark"
                : "border-dark bg-light-subtle"
            } border border-3 rounded-3 px-3 py-2`}
            placeholder="Usuario"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>

        <div className="input-group mb-4 d-flex flex-column gap-2">
          <label htmlFor="password">Contraseña</label>
          <div className="position-relative w-100">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`${
                darkMode
                  ? "border-dark-subtle bg-dark"
                  : "border-dark bg-light-subtle"
              } border border-3 rounded-3 px-3 py-2 w-100`}
              onChange={handleChange}
              value={formData.password}
              required
            />

            <button
              onClick={handleShowPassword}
              className="btn position-absolute end-0 top-50 
              translate-middle-y me-2 z-3 show-password w-auto"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <EyeSlashIcon className="icon" />
              ) : (
                <EyeIcon className="icon" />
              )}
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-end pt-3">
          <input
            type="submit"
            value="Actualizar Datos"
            className="btn btn-primary btn-lg fs-2 px-4 py-3"
            disabled={!isFormValid}
          />
        </div>

        <img
          src="/img/phoenix-char.png"
          className="img-deco d-none d-md-block"
          alt="Decoration"
        />
      </form>
    </div>
  );
}
