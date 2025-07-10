import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("bg-body");
      document.body.classList.add("bg-dark");
    } else {
      document.body.classList.remove("bg-dark");
      document.body.classList.add("bg-body");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
