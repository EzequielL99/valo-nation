import { createContext, useEffect, useMemo, useReducer } from "react";
import { initialState, productReducer } from "../reducers/product-reducer";

export const ProductContext = createContext();

// Selector: Retorna los objetos disponibles/visibles para la
const getShopProducts = (state) => {
  // Mapa de productos modificados
  const modifiedMap = new Map(
    state.modifiedProducts.map((item) => [item.id, item])
  );

  // Combinar productos API y productos CUSTOM, aplicando modificaciones
  const allProducts = [
    ...state.customProducts.map((item) => modifiedMap.get(item.id) || item),
    ...state.products.map((item) => modifiedMap.get(item.id) || item),
  ];

  // Filtrar bloqueados
  return allProducts.filter((item) => !state.hiddenProducts.includes(item.id));
};

// Selector: Retorna los objetos disponibles/visibles para la
const getAllProducts = (state) => {
  // Mapa de productos modificados
  const modifiedMap = new Map(
    state.modifiedProducts.map((item) => [item.id, item])
  );

  // Combinar productos API y productos CUSTOM, aplicando modificaciones
  const allProducts = [
    ...state.customProducts.map((item) => modifiedMap.get(item.id) || item),
    ...state.products.map((item) => modifiedMap.get(item.id) || item),
  ];

  // Filtrar bloqueados
  return allProducts;
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "customProducts",
      JSON.stringify(state.customProducts)
    );
  }, [state.customProducts]);

  useEffect(() => {
    localStorage.setItem(
      "modifiedProducts",
      JSON.stringify(state.modifiedProducts)
    );
  }, [state.modifiedProducts]);

  useEffect(() => {
    localStorage.setItem(
      "hiddenProducts",
      JSON.stringify(state.hiddenProducts)
    );
  }, [state.hiddenProducts]);

  const shopProducts = useMemo(
    () => getShopProducts(state),
    [
      state.products,
      state.customProducts,
      state.modifiedProducts,
      state.hiddenProducts,
    ]
  );

  const allProducts = useMemo(
    () => getAllProducts(state),
    [
      state.products,
      state.customProducts,
      state.modifiedProducts,
      state.hiddenProducts,
    ]
  );

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        shopProducts,
        allProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
