import { createContext, useReducer } from "react";
import { cartReducer, initialState } from "../reducers/cart-reducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartDispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
