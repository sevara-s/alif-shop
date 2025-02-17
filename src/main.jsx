import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainRouter from "./router";
import { CartContextProvider } from "./context/shopLIke";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <CartContextProvider>
    <RouterProvider router={MainRouter} />
  </CartContextProvider>
);
