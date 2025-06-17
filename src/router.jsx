import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import ShopPage from "./pages/shop/ShopPage";
import CartPage from "./pages/shop/CartPage";
import ProductDetailPage from "./pages/shop/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import NewProductPage from "./pages/admin/NewProductPage";
import ProductsPage from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";

import PrivateRoute from "./components/auth/PrivateRoute";
import RoleRoute from "./components/auth/RoleRoute";
import EditProductPage from "./pages/admin/EditProductPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas publicas */}
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          {/* <Route path="*" element={<ContactPage />} /> */}
        </Route>

        {/* Rutas protegidas: LOGIN */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/cart" element={<CartPage />} />
          <Route path="/shop/:id" element={<ProductDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Rutas protegidas por rol: ADMIN */}
        <Route
          element={
            <RoleRoute requiredRole="ADMIN">
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/admin/products/new" element={<NewProductPage />} />
          <Route path="/admin/products/:id/edit" element={<EditProductPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
        </Route>

        {/* Rutas de autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
