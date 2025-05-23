export const initialState = {
  users: [],
  currentUser: null,
  error: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "load-users":
      return {
        ...state,
        users: action.payload.users,
      };

    case "register": {
      // Revisar si existe usuario
      const userExists = state.users.some(
        (user) => user.email === action.payload.newUser.email
      );

      if (userExists) {
        return {
          ...state,
          error: "El correo ya esta registrado.",
        };
      }

      // Relevar rol del nuevo usuario
      const newUser = { ...action.payload.newUser, role: "user" };

      if (action.payload.newUser.usuario.toLowerCase() === "admin") {
        newUser.role = "admin";
      }
      // Registrar nuevo usuario
      const updatedUsers = [...state.users, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return {
        ...state,
        users: updatedUsers,
        currentUser: newUser,
        error: null,
      };
    }

    case "login": {
      const filteredUser = state.users.find(
        (user) => user.email === action.payload.userData.email
      );

      if (typeof filteredUser == "undefined") {
        return {
          ...state,
          error: "Correo no encontrado",
        };
      }

      // Validar password
      if (filteredUser.password !== action.payload.userData.password) {
        return {
          ...state,
          error: "Credenciales inválidas",
        };
      }

      return {
        ...state,
        error: null,
        currentUser: filteredUser,
      };
    }

    case "logout":
      return {
        ...state,
        currentUser: null,
      };

    case "clear-error":
      return { ...state, error: null };

    default:
      return state;
  }
};
