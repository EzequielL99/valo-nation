export const initialState = {
  products: [],
  customProducts: JSON.parse(localStorage.getItem("customProducts")) || [],
  modifiedProducts: JSON.parse(localStorage.getItem("modifiedProducts")) || [],
  hiddenProducts: JSON.parse(localStorage.getItem("hiddenProducts")) || [],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const productExists = state.customProducts.find(
        (product) => product.id === action.payload.id
      );

      let updatedProducts = state.customProducts;

      if (!productExists) {
        updatedProducts = [...updatedProducts, action.payload];
      }

      return {
        ...state,
        customProducts: updatedProducts,
      };
    }
    case "DELETE_PRODUCT":
      break;
    case "EDIT_PRODUCT":
      // Con API, sería una petición PUT
      // Instrucciones para una peticion PUT/PATCH...

      // PRODUCTO ES CUSTOM
      if (
        state.customProducts.some((product) => product.id === action.payload.id)
      ) {
        let updatedProducts = state.customProducts.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );

        return {
          ...state,
          customProducts: updatedProducts,
        };
      } else {
        // PRODUCTO DE API
        let updatedModifiedProducts = state.modifiedProducts;

        // Ya existe el elemento modificado
        if (
          state.modifiedProducts.some(
            (product) => product.id === action.payload.id
          )
        ) {
          updatedModifiedProducts = state.modifiedProducts.map((product) =>
            product.id === action.payload.id ? action.payload : product
          );
        } else {
          // Se agrega como nuevo elemento modificado
          updatedModifiedProducts = [
            ...updatedModifiedProducts,
            action.payload,
          ];
        }

        return {
          ...state,
          modifiedProducts: updatedModifiedProducts,
        };
      }
    case "HIDE_PRODUCT": {
      // Buscar en productos CUSTOM
      let item = state.customProducts.find(
        (item) => item.id === action.payload
      );

      if (!item) {
        // Buscar en productos MODIFICADOS
        item = state.modifiedProducts.find(
          (item) => item.id === action.payload
        );

        if (!item) {
          // Buscar en productos GENERALES
          item = state.products.find((item) => item.id === action.payload);

          if (!item) return state;
        }
      }

      // ID existe entre los productos
      if (!state.hiddenProducts.some((item) => item.it === action.payload)) {
        let updatedHiddenProducts = [...state.hiddenProducts, action.payload];

        return {
          ...state,
          hiddenProducts: updatedHiddenProducts,
        };
      }

      return {
        ...state,
      };
    }

    case "UNHIDE_PRODUCT":
      return {
        ...state,
        hiddenProducts: state.hiddenProducts.filter(
          (id) => id !== action.payload
        ),
      };

    case "SET_PRODUCTS": {
      // Sincronizar Modificados con API
      const syncProducts = action.payload.map((item) => {
        const mProduct = state.modifiedProducts.find(
          (product) => product.id === item.id
        );
        return mProduct ? mProduct : item;
      });

      return {
        ...state,
        products: syncProducts,
      };
    }
    default:
      return state;
  }
};
