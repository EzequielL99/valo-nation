import {useReducer, createContext} from 'react';
import { cartReducer, initialState } from '../reducers/cart-reducer';

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    )
}