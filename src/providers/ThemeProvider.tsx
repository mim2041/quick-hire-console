// // providers/ThemeProvider.tsx
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { useSettings } from "@/features/settings/hooks/useSettings";

// type Theme = "light" | "dark" | "system";

// interface ThemeContextType {
//   theme: Theme;
//   currentTheme: "light" | "dark"; // The actual applied theme (resolved from system if needed)
//   setTheme: (theme: Theme) => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const { theme, updateTheme } = useSettings();
//   const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

//   // Effect to handle system theme preference and changes
//   useEffect(() => {
//     const setThemeBasedOnPreference = () => {
//       if (theme === "system") {
//         const isDarkMode = window.matchMedia(
//           "(prefers-color-scheme: dark)",
//         ).matches;
//         setCurrentTheme(isDarkMode ? "dark" : "light");
//       } else {
//         setCurrentTheme(theme as "light" | "dark");
//       }
//     };

//     setThemeBasedOnPreference();

//     // Listen for changes in system preference
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = () => {
//       if (theme === "system") {
//         setCurrentTheme(mediaQuery.matches ? "dark" : "light");
//       }
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [theme]);

//   // Apply theme to document
//   useEffect(() => {
//     // Remove both classes first
//     document.documentElement.classList.remove("light", "dark");
//     // Add the current theme class
//     document.documentElement.classList.add(currentTheme);
//   }, [currentTheme]);

//   const setTheme = (newTheme: Theme) => {
//     updateTheme(newTheme);
//   };

//   const value = {
//     theme: theme || "system",
//     currentTheme,
//     setTheme,
//   };

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// };

// export const useThemeContext = (): ThemeContextType => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useThemeContext must be used within a ThemeProvider");
//   }
//   return context;
// };
