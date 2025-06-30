import { useReducer, createContext, useEffect, useState } from "react";
import { authReducer, initialState } from "../reducers/auth-reducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, initialState);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  useEffect(
    () => localStorage.setItem("users", JSON.stringify(users)),
    [users]
  );

  const register = (formData) => {
    try {
      // Revisar si existe usuario
      const userExists = users.some((user) => user.email === formData.email);

      if (userExists)
        return {
          success: false,
          error: "El correo ya esta registrado.",
        };

      // Relevar rol del usuario
      const newUser = { ...formData, role: "user" };

      if (newUser.username.toLowerCase() === "admin") {
        newUser.role = "admin";
      }

      // Actualizar usuarios
      const updatedUsers = [...users, newUser];

      setUsers(updatedUsers);

      // Actualizar LocalStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return {
        success: true,
      };
    } catch (error) {
      console.log(error.message);

      return {
        success: false,
        error: "Error desconocido",
      };
    }
  };

  const login = (formData) => {
    try {
      // Filtrar usuario
      const filteredUser = users.find((user) => user.email === formData.email);

      if (typeof filteredUser == "undefined") {
        return {
          success: false,
          error: "Usuario no encontrado",
        };
      }

      // Validar password
      if (filteredUser.password !== formData.password) {
        return {
          success: false,
          error: "Credenciales inválidas",
        };
      }

      // TODO OK
      authDispatch({ type: "LOGIN", payload: filteredUser });

      return {
        success: true,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        error: "Error Desconocido",
      };
    }
  };

  const logout = () => {
    // Eliminar Token
    localStorage.removeItem("authToken");

    authDispatch({ type: "LOGOUT" });
  };

  const deleteUser = (email) => {
    try {
      setUsers(users.filter((user) => user.email !== email ));

      return {
        success: true,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        error: "Error desconocido",
      };
    }
  };

  const updateUserData = (formData) => {
    try {
      const updatedUsers = users.map((user) => {
        if (user.email === auth.currentUser.email) {
          let updatedData = user;

          Object.keys(formData).forEach(
            (key) => (updatedData[key] = formData[key])
          );

          return updatedData;
        }

        return user;
      });

      console.log(updatedUsers);

      setUsers(updatedUsers);
      authDispatch({ type: "UPDATE_USER", payload: formData });

      return {
        success: true,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        error: "Error desconocido",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        register,
        login,
        logout,
        updateUserData,
        deleteUser,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
