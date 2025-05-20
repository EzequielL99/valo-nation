import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ShopPage from "./pages/shop/ShopPage";
import Layout from "./layouts/Layout";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/shop" element={<ShopPage />} index />
          <Route path="/profile" element={<ProfilePage />} index />
          <Route path="/admin" element={<AdminPage />} index />
          <Route path="/contact" element={<ContactPage />} index />
        </Route>

        <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
