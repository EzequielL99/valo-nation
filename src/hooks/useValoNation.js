import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const useValoNation = () => {
    const context = useContext(AppContext);
    if(!context) throw new Error('useValoNation debe utilizarse dentro de un AppProvider')

    return context;
}