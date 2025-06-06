import { useReducer, createContext } from "react";
import { authReducer, initialState } from "../reducers/auth-reducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, initialState);

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
