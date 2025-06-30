import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FormErrorMessage from "../FormErrorMessage";

const initialFormData = {
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

export default function NewUserModal({ modal, setModal }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const { users, register } = useAuth();

  const handleChange = (e) => {
    // Limpiar error
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    // Remover KEY email
    let updatedErrors = {};

    Object.keys(errors)
      .filter((key) => key !== "email")
      .forEach((key) => (updatedErrors[key] = errors[key]));

    if (users.some((user) => user.email === e.target.value.trim())) {
      updatedErrors.email =
        "El correo ya existe. Por favor, ingrese uno diferente";
    }

    setErrors(updatedErrors);
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

    // Registrar Usuario
    const response = register(formData);
    if (response.success) {
      toast.success("Usuario creado correctamente", {
        autoClose: 1200,
      });

      setFormData(initialFormData);
    } else {
      toast.error(response.error, {
        autoClose: 1200,
      });
    }
  };

  const handleCloseModal = (e) => {
    e.preventDefault();

    // Reiniciar formulario
    setFormData(initialFormData);
    setErrors({});

    // Cerrar Modal
    setModal(false);
  };

  const isFormValid = useMemo(
    () =>
      formData.email.trim() !== "" &&
      formData.username.trim() !== "" &&
      formData.password.trim() !== "",
    [formData, errors]
  );

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="position-relative z-3" onClose={() => {}}>
          <TransitionChild as={Fragment}>
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75" />
          </TransitionChild>

          <div className="position-fixed top-0 start-0 w-100 h-100 overflow-y-auto">
            <div className="d-flex h-100 align-items-center justify-content-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="position-relative overflow-hidden rounded-4 bg-white p-5 text-start shadow-lg">
                  <DialogTitle
                    as="h3"
                    className="text-primary h2 fw-medium mb-3 text-start"
                  >
                    Crear usuario
                  </DialogTitle>

                  <button
                    className="btn position-absolute btn-exit p-2"
                    onClick={handleCloseModal}
                  >
                    <XMarkIcon className="icon" />
                  </button>
                  <form
                    noValidate
                    className="bo-form-new-user"
                    onSubmit={handleSubmit}
                  >
                    <p className="p-0 m-0 bg-light-subtle mb-4">
                      Coloca{" "}
                      <span className="fw-medium text-primary">Admin</span> al
                      usuario para ser Administrador
                    </p>

                    <div className="input-group mb-4 d-flex flex-column gap-2">
                      <label htmlFor="username">Usuario</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                        placeholder="John Doe"
                        onChange={handleChange}
                        value={formData.username}
                        aria-describedby="username-error"
                      />
                      {errors.username && (
                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                      )}
                    </div>

                    <div className="input-group mb-4 d-flex flex-column gap-2">
                      <label htmlFor="email">Correo</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formData.email}
                        className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                        placeholder="correo@correo.com"
                        aria-describedby="email-error"
                      />
                      {errors.email && (
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      )}
                    </div>

                    <div className="input-group mb-4 d-flex flex-column gap-2">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                        aria-describedby="password-error"
                        autoComplete="off"
                      />
                      {errors.password && (
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-5">
                      <button
                        className="link-secondary btn"
                        onClick={handleCloseModal}
                      >
                        Cancelar
                      </button>
                      <input
                        type="submit"
                        value="Crear usuario"
                        disabled={!isFormValid}
                        className="text-uppercase btn btn-primary px-4 py-2"
                      />
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
