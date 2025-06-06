import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}
