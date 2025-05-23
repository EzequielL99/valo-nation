import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import ShopPage from "./pages/shop/ShopPage";
import Layout from "./layouts/Layout";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useValoNation } from "./hooks/useValoNation";

export default function AppRouter() {
  const {auth} = useValoNation();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index/>
          <Route path="/shop" element={<PrivateRoute> <ShopPage /> </PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminPage={true}> <AdminPage /> </PrivateRoute>} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={!auth.currentUser ? <LoginPage /> : <Navigate to='/shop' replace />} />
            <Route path="/auth/register" element={!auth.currentUser ? <RegisterPage /> : <Navigate to='/shop' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
