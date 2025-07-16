import { Helmet } from "react-helmet";
import ProductForm from "../../components/admin/ProductForm";

export default function EditProductPage() {
  return (
    <>
      <Helmet>
        <title>Admin | Editar Producto</title>
        <meta name="description" content="Edita los productos de tu tienda" />
      </Helmet>
      <ProductForm edit={true} />
    </>
  );
}
