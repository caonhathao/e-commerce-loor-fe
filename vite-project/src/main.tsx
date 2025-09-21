import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/css/root.css";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import { SearchProvider } from "./context/SearchContext.tsx";

createRoot(document.getElementById("root")!).render(
  <SearchProvider>
    <App />
  </SearchProvider>
);
