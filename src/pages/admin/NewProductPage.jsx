import { Helmet } from "react-helmet";
import ProductForm from "../../components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <Helmet>
        <title>Admin | Agregar Producto</title>
        <meta
          name="description"
          content="Crea nuevos productos para tu tienda"
        />
      </Helmet>
      <ProductForm />
    </>
  );
}
