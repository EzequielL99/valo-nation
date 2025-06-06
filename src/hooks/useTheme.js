import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme =() => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error('useTheme debe utilizarse dentro de un ThemeProvider');

    return context;
}