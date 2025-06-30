import { createFakeJWT } from "../utils";

export const initialState = {
  currentUser: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      // Credenciales OK - Generar Fake JWT
      createFakeJWT(action.payload.username);

      return {
        ...state,
        currentUser: action.payload,
      };
    }

    case "UPDATE_USER": {
      // Actualizar Datos del Usuario Actual
      const updatedCurrentUser = {
        ...state.currentUser,
        email: action.payload.email,
        username: action.payload.username,
        password: action.payload.password,
      };

      return {
        ...state,
        currentUser: updatedCurrentUser,
      };
    }

    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};
