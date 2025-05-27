import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const categories = [
  { id: 1, value: "Gestión de Cuenta" },
  { id: 2, value: "Soporte Técnico" },
  { id: 3, value: "Compra" },
  { id: 4, value: "Devolución" },
  { id: 5, value: "Reembolso" },
];

const initialState = {
  username: "",
  category: "1",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Tu mensaje fue enviado", { autoClose: 2000 });
    setFormData(initialState);
  };

  const formIsValid = useMemo(() => {
    const { username, category, message } = formData;

    return username.trim() !== "" && category !== "" && message.trim() !== "";
  }, [formData]);

  return (
    <>
      <section className="container-fluid hero d-flex flex-column align-items-center justify-content-center">
        <div className="container text-white text-center">
          <h1 className="text-uppercase fw-bold">Contacto</h1>
        </div>
      </section>
      <main className="bg-light">
        <div className="row">
          <div className="col-12">
            <div className="container-sm pb-5">
              <form
                onSubmit={handleSubmit}
                className="border bordar-1 bg-light-subtle border-dark-subtle rounded-4 contact-form mx-auto p-5 position-relative z-2"
              >
                <legend className="text-primary mb-3">
                  Completa el formulario para comunicarte con nosotros...
                </legend>

                <div className="input-group mb-4 d-flex flex-column gap-2">
                  <label htmlFor="username">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                    placeholder="Usuario"
                    onChange={handleChange}
                    value={formData.username}
                    required
                  />
                </div>

                <div className="input-group mb-4 d-flex flex-column gap-2">
                  <label htmlFor="">Topico</label>
                  <select
                    name="category"
                    id="category"
                    className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                    onChange={handleChange}
                    defaultValue={"1"}
                    required
                  >
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-4 d-flex flex-column gap-2">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                    name="message"
                    id="message"
                    onChange={handleChange}
                    value={formData.message}
                    placeholder="Escribenos tu mensaje"
                    required
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end align-items-center">
                  <input
                    type="submit"
                    value="enviar"
                    className="btn btn-primary px-4 py-2 text-uppercase"
                    disabled={!formIsValid}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
