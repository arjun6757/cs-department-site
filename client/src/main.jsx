import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/auth.context.jsx";
import ThemeProvider from "./context/theme.context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <div className="flex justify-center font-inter bg-white dark:bg-[#171717] text-gray-700 dark:text-gray-300">
          <App />
        </div>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
);
