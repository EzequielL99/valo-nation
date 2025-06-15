export const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      break;
    case "DELETE_PRODUCT":
      break;
    case "EDIT_PRODUCT":
      break;
    case "BLOCK_PRODUCT":
      break;
    default:
      return state;
  }
};
