// import { createContext, useContext, useState, useEffect } from "react";

// const ThemeContext = createContext(null);

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(
//     () => localStorage.getItem("theme") || "light"
//   );

//   useEffect(() => {
//     const root = document.documentElement;

//     // DARK / LIGHT
//     if (theme === "dark") {
//       root.classList.add("dark");
//     } else {
//       root.classList.remove("dark");
//     }

//     localStorage.setItem("theme", theme);

//     // LOAD COLOR THEME
//     const savedColor = localStorage.getItem("color-theme") || "blue";
//     root.setAttribute("data-theme", savedColor);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const setColorTheme = (color) => {
//     document.documentElement.setAttribute("data-theme", color);
//     localStorage.setItem("color-theme", color);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, setColorTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);





















import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // LOAD THEME ON MOUNT
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setTheme(systemDark ? "dark" : "light");
    }
  }, []);

  // APPLY THEME
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // TOGGLE
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);