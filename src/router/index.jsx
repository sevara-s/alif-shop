import { createBrowserRouter } from "react-router-dom";

import Mainlayout from "../components/mainlayout";
import HomePage from "../pages/home/home";
import ProductsPage from "../pages/carts/products";
import Favorites from "../pages/like/fav";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        Component: HomePage,
        title: "Home",
      },
      {
        path: "/products",
        Component: ProductsPage,
        title: "Products Page",
      },
      {
        path: "/fav",
        Component: Favorites,
        title: "Favourite products",
      },
    ],
  },
]);

export default MainRouter;
