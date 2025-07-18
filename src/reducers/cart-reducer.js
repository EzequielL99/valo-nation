const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

export const initialState = [];

export const cartReducer = (state, action) => {
  if (action.type === "add-to-cart") {
    const { item } = action.payload;

    //Revisar si producto ya existe
    const itemExists = state.find((product) => product.id === item.id);

    let updatedCart = [];
    if (itemExists) {
      updatedCart = state.map((product) => {
        if (product.id === item.id) {
          if (product.quantity < MAX_ITEMS) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        } else {
          return product;
        }
      });
    } else {
      const newItem = {
        ...item,
        quantity: 1,
      };

      updatedCart = [...state, newItem];
    }

    return updatedCart;
  }

  if (action.type === "remove-from-cart") {
    const { itemId } = action.payload;

    return state.filter((item) => item.id !== itemId);
  }

  if (action.type === "increase-quantity") {
    const { itemId } = action.payload;

    const itemExists = state.find((product) => product.id === itemId);

    let updatedCart = state;
    if (itemExists) {
      updatedCart = state.map((product) => {
        if (product.id === itemId) {
          if (product.quantity < MAX_ITEMS) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        } else {
          return product;
        }
      });
    }

    return updatedCart;
  }

  if (action.type === "decrease-quantity") {
    const { itemId } = action.payload;

    const itemExists = state.find((product) => product.id === itemId);

    let updatedCart = state;
    if (itemExists) {
      // Relevar si el producto se debe eliminar
      if (itemExists.quantity <= MIN_ITEMS) {
        updatedCart = state.filter((product) => product.id !== itemId);
      } else {
        updatedCart = state.map((product) => {
          if (product.id === itemId) {
            if (product.quantity > MIN_ITEMS) {
              return { ...product, quantity: product.quantity - 1 };
            } else {
              return product;
            }
          } else {
            return product;
          }
        });
      }
    }

    return updatedCart;
  }

  if (action.type === "clear-cart") {
    return [];
  }

  return state;
};
