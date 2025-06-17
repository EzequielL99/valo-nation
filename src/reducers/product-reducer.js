export const initialState = {
  products: [],
  customProducts: JSON.parse(localStorage.getItem("customProducts")) || [],
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
      break;
    case "BLOCK_PRODUCT":
      break;
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};
