import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.tsx";
import "../styles/main.scss";
import Delivery from "../pages/Delivery.tsx";
import { Products } from "../features/products/Products.tsx";
import ProductPage  from "../features/products/components/product_page/ProductPage.tsx";

import  { AuthPanel }  from "../features/auth/AuthPanel.tsx";
import  Orders   from "../features/orders/Orders.tsx";
import  Inventory   from "../features/inventory/Inventory.tsx";
import  FrontPage   from "../features/front/FrontPage.tsx";
import Profile from "../features/profile/Profile.tsx";
import Contact from "../features/contact/Contact.tsx";
import NotFound from "../pages/NotFound.tsx"


import Verify from "../features/auth/components/Verify.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: FrontPage},
      { path: "/products", Component: Products},
      { path: "/products/:id", Component: ProductPage},
      { path: "delivery", Component: Delivery },
      {
        path: "profile",
        Component: Profile,
      },
      { path: "contact", Component: Contact },
      { path: "signup", Component: AuthPanel },
      { path: "login", Component: AuthPanel },
      { path: "verify", Component: Verify },
      { path: "orders", Component: Orders },
      { path: "inventory", Component: Inventory},
      { path: "*", Component: NotFound}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
