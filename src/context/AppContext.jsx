import {useReducer, createContext} from 'react';
import { cartReducer, initialState } from '../reducers/cart-reducer';
import { authReducer, initialState as authInitialState } from '../reducers/auth-reducer';

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [cart, cartDispatch] = useReducer(cartReducer, initialState);
    const [auth, authDispatch] = useReducer(authReducer, authInitialState);

    return (
        <AppContext.Provider
            value={{
                cart,
                cartDispatch,
                auth,
                authDispatch
            }}
        >
            {children}
        </AppContext.Provider>
    )
}