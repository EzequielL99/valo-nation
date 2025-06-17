import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ProductProvider } from "../contexts/ProductContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
