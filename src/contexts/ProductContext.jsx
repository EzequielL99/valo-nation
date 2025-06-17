import { createContext, useEffect, useReducer } from "react";
import { initialState, productReducer } from "../reducers/product-reducer";


export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    useEffect(() => {
        localStorage.setItem('customProducts', JSON.stringify(state.customProducts));
    }, [state.customProducts])

    return (
        <ProductContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            { children }
        </ProductContext.Provider>
    )
}