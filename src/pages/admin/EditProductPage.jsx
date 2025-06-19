import { useEffect, useRef, useState } from "react";

import Loader from "../../components/Loader";
import FormErrorMessage from "../../components/FormErrorMessage";
import { useProduct } from "../../hooks/useProduct";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import FloppyIcon from "../../components/icons/FloppyIcon";

const categories = [
  {
    id: "Heavy Weapons",
    name: "Arma Pesada",
  },
  {
    id: "Rifles",
    name: "Rifles",
  },
  {
    id: "Shotguns",
    name: "Escopetas",
  },
  {
    id: "Pistols",
    name: "Pistolas",
  },
  {
    id: "Sniper Rifles",
    name: "Francotirador",
  },
  {
    id: "SMGs",
    name: "Ametralladoras",
  },
  {
    id: "Melee",
    name: "Cuerpo a cuerpo",
  },
];

const formInitialState = {
  name: "",
  category: categories[0].id,
  img: "",
  price: 10,
  stats: {
    equipTimeSeconds: 1,
    fireRate: 1,
    firstBulletAccuracy: 1,
    magazineSize: 1,
    reloadTimeSeconds: 1,
  },
};

const statsDescriptions = Object.keys(formInitialState.stats);

// Validacion del formulario
const validateForm = (formData) => {
  const errors = {};

  // Validacion: name
  if (formData.name.trim() === "")
    errors.name = "El nombre no puede estar vacío";

  // Validacion: category
  if (formData.category.trim() === "")
    errors.category = "Debes seleccionar una categoria";

  // Validacion: price
  const priceValue = parseFloat(formData.price);
  if (isNaN(priceValue)) {
    errors.price = "El precio debe ser un número";
  } else if (priceValue < 0) {
    errors.price = "El precio no puede ser negativo";
  }

  // Validacion: img
  if (formData.img.trim() === "") errors.img = "Ingresa una URL válida";

  // Validacion STATS: equipTimeSeconds
  const equipTimeValue = parseFloat(formData.stats.equipTimeSeconds);
  if (isNaN(equipTimeValue)) {
    errors.equipTimeSeconds = "El tiempo de equipacion debe ser un número";
  } else if (equipTimeValue <= 0) {
    errors.equipTimeSeconds = "Ingresa un tiempo válido";
  }

  // Validacion STATS: fireRate
  const fireRateValue = parseFloat(formData.stats.fireRate);
  if (isNaN(fireRateValue)) {
    errors.fireRate = "La cadencia debe ser un número";
  } else if (fireRateValue < 0) {
    errors.fireRate = "Ingresa una cadencia válida";
  }

  // Validacion STATS: firstBulletAccuracy
  const accuracyValue = parseFloat(formData.stats.firstBulletAccuracy);
  if (isNaN(accuracyValue)) {
    errors.firstBulletAccuracy = "La precisión debe ser un número";
  } else if (accuracyValue < 0) {
    errors.firstBulletAccuracy = "La precisión no puede ser negativa";
  }

  // Validacion STATS: magazineSize
  const magazineValue = parseInt(formData.stats.magazineSize);
  if (isNaN(magazineValue)) {
    errors.magazineSize = "El cargador debe ser un número";
  } else if (magazineValue < 0) {
    errors.magazineSize = "La capacidad del cargador no puede ser negativa";
  }

  // Validacion STATS: reloadTimeSeconds
  const reloadTimeValue = parseInt(formData.stats.reloadTimeSeconds);
  if (isNaN(reloadTimeValue)) {
    errors.reloadTimeSeconds = "El tiempo de recarga debe ser un número";
  } else if (reloadTimeValue < 0) {
    errors.reloadTimeSeconds = "El tiempo de recarga no puede ser negativo";
  }

  return errors;
};

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const originalDataRef = useRef(null);
  const { state, dispatch } = useProduct();

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(formInitialState);
  const [errors, setErrors] = useState({});
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    // Buscar entre los productos MODIFICADOS de la API
    let product = state.modifiedProducts.find((product) => product.id === id);

    if (!product) {
      // Buscar entre los productos de la API
      product = state.products.find((product) => product.id === id);

      if (!product) {
        // Buscar entre los productos CUSTOM
        product = state.customProducts.find((product) => product.id === id);

        if (!product) navigate("/admin/products");
      }
    }

    // Establecer los datos del producto original
    originalDataRef.current = product;

    setFormData({
      name: product.name,
      category: product.category,
      img: product.img,
      price: product.price,
      stats: {
        equipTimeSeconds: product.stats.equipTimeSeconds,
        fireRate: product.stats.fireRate,
        firstBulletAccuracy: product.stats.firstBulletAccuracy,
        magazineSize: product.stats.magazineSize,
        reloadTimeSeconds: product.stats.reloadTimeSeconds,
      },
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (originalDataRef.current && !isLoading) {
      let dataWasModified = false;
      Object.keys(formData).forEach((key) => {
        // Evaluar OBJETO - STATS
        if (typeof originalDataRef.current[key] === "object") {
          Object.keys(formData[key]).forEach((key2) => {
            if (originalDataRef.current[key][key2] != formData[key][key2])
              dataWasModified = true;
            return;
          });
        } else {
          if (originalDataRef.current[key] != formData[key])
            dataWasModified = true;
          return;
        }
      });

      dataWasModified ? setIsSaveEnabled(true) : setIsSaveEnabled(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Es un STAT
    if (statsDescriptions.includes(name)) {
      let newStats = formData.stats;
      newStats = {
        ...newStats,
        [name]: value,
      };
      setFormData({
        ...formData,
        stats: newStats,
      });
    } else {
      // Es una propiedad GENERAL
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    // Evaluar si existen errores
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Limpiar errores
    setErrors({});

    // Editar producto
    const editObjProduct = {
      ...formData,
      id,
      skins: originalDataRef.current['skins']
    };

    dispatch({ type: "EDIT_PRODUCT", payload: editObjProduct });

    toast.success("Producto editado!", {
      autoClose: 1000,
      onClose: () => {
        navigate("/admin/products");
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="container text-center">
          <Loader className="mx-auto my-4" />
          <p>Cargando productos...</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center edit-product-page">
            <h1 className="text-primary">Editar Producto</h1>
            <button
              type="submit"
              form="formAddProduct"
              value="Guardar cambios"
              className="btn btn-primary d-flex gap-2 align-items-center p-4"
              disabled={!isSaveEnabled}
            >
              <FloppyIcon />
              <span className="fs-3">Guardar cambios</span>
            </button>
          </div>
          <form
            id="formAddProduct"
            className="add-product-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-generals rounded-4 shadow p-5 my-5">
              <h3 className="fw-bold text-dark h3 mb-4">Generales</h3>
              <div className="d-flex justify-content-between gap-4">
                <div className="col-product flex-grow-1">
                  <div className="input-group mb-4 d-flex flex-column gap-2">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                      placeholder="Rifle asombroso"
                      onChange={handleChange}
                      value={formData.name}
                      aria-describedby="name-error"
                    />
                    {errors.name && (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    )}
                  </div>

                  <div className="input-group mb-4 d-flex flex-column gap-2">
                    <label htmlFor="category">Categoria</label>
                    <select
                      name="category"
                      id="category"
                      className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                      onChange={handleChange}
                      defaultValue={categories[0].id}
                      aria-describedby="category-error"
                    >
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <FormErrorMessage>{errors.category}</FormErrorMessage>
                    )}
                  </div>

                  <div className="input-group mb-4 d-flex flex-column gap-2">
                    <label htmlFor="img">
                      Imagen (Busca armamento{" "}
                      <a
                        href="https://www.deviantart.com/battlegroundpnh"
                        target="_blank"
                        className="link-info"
                      >
                        aquí
                      </a>
                      )
                    </label>
                    <input
                      type="text"
                      id="img"
                      name="img"
                      className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                      placeholder="URL de tu imagen"
                      onChange={handleChange}
                      value={formData.img}
                      aria-describedby="url-image-error"
                    />
                    {errors.img && (
                      <FormErrorMessage>{errors.img}</FormErrorMessage>
                    )}
                  </div>

                  <div className="input-group mb-4 d-flex flex-column gap-2">
                    <label htmlFor="price">Precio</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                      onChange={handleChange}
                      value={formData.price}
                      min="0"
                      step="0.01"
                      aria-describedby="price-error"
                    />
                    {errors.price && (
                      <FormErrorMessage>{errors.price}</FormErrorMessage>
                    )}
                  </div>
                </div>
                <div className="col-img">
                  <div className="image-wrapper rounded-3 overflow-hidden bg-dark-subtle d-flex align-items-center justify-content-center mx-auto">
                    <img
                      src={
                        formData.img.trim() !== ""
                          ? formData.img
                          : "/img/ar-icon.png"
                      }
                      className="img-fluid"
                      alt="Imagen de tu producto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-specs rounded-4 shadow p-5 my-5">
              <h3 className="fw-bold text-dark h3 mb-4">Caracteristicas</h3>
              <div className="input-group mb-4 d-flex flex-column gap-2">
                <label htmlFor="equipTimeSeconds">Tiempo equipado</label>
                <input
                  type="number"
                  id="equipTimeSeconds"
                  name="equipTimeSeconds"
                  className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                  min="0"
                  step="0.01"
                  onChange={handleChange}
                  value={formData.stats.equipTimeSeconds}
                  aria-describedby="equipTimeSeconds-error"
                />
                {errors.equipTimeSeconds && (
                  <FormErrorMessage>{errors.equipTimeSeconds}</FormErrorMessage>
                )}
              </div>

              <div className="input-group mb-4 d-flex flex-column gap-2">
                <label htmlFor="fireRate">Cadencia</label>
                <input
                  type="number"
                  id="fireRate"
                  name="fireRate"
                  className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                  min="0"
                  step="0.01"
                  onChange={handleChange}
                  value={formData.stats.fireRate}
                  aria-describedby="fireRate-error"
                />
                {errors.fireRate && (
                  <FormErrorMessage>{errors.fireRate}</FormErrorMessage>
                )}
              </div>

              <div className="input-group mb-4 d-flex flex-column gap-2">
                <label htmlFor="firstBulletAccuracy">Precision</label>
                <input
                  type="number"
                  id="firstBulletAccuracy"
                  name="firstBulletAccuracy"
                  className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                  min="0"
                  step="0.01"
                  onChange={handleChange}
                  value={formData.stats.firstBulletAccuracy}
                  aria-describedby="firstBulletAccuracy-error"
                />
                {errors.firstBulletAccuracy && (
                  <FormErrorMessage>
                    {errors.firstBulletAccuracy}
                  </FormErrorMessage>
                )}
              </div>

              <div className="input-group mb-4 d-flex flex-column gap-2">
                <label htmlFor="magazineSize">Cargador</label>
                <input
                  type="number"
                  id="magazineSize"
                  name="magazineSize"
                  className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                  min="0"
                  onChange={handleChange}
                  value={formData.stats.magazineSize}
                  aria-describedby="magazineSize-error"
                />
                {errors.magazineSize && (
                  <FormErrorMessage>{errors.magazineSize}</FormErrorMessage>
                )}
              </div>

              <div className="input-group mb-4 d-flex flex-column gap-2">
                <label htmlFor="reloadTimeSeconds">Tiempo de recarga</label>
                <input
                  type="number"
                  id="reloadTimeSeconds"
                  name="reloadTimeSeconds"
                  className="border border-3 border-light-subtle rounded-3 bg-dark-subtle px-3 py-2"
                  min="0"
                  step="0.01"
                  onChange={handleChange}
                  value={formData.stats.reloadTimeSeconds}
                  aria-describedby="reloadTimeSeconds-error"
                />
                {errors.reloadTimeSeconds && (
                  <FormErrorMessage>
                    {errors.reloadTimeSeconds}
                  </FormErrorMessage>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/admin/products" className="link-danger">
                Cancelar
              </Link>

              <button
                type="submit"
                value="Guardar cambios"
                className="btn btn-primary d-flex gap-2 align-items-center p-4"
                disabled={!isSaveEnabled}
              >
                <FloppyIcon />
                <span className="fs-3">Guardar cambios</span>
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
