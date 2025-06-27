import { useReducer, createContext, useEffect } from "react";
import { authReducer, initialState } from "../reducers/auth-reducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(auth.users));
  }, [auth.users]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
