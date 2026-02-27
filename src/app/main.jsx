import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.tsx";
import "../styles/main.scss";
import Delivery from "../pages/Delivery.tsx";
import { Products } from "../features/products/Products.tsx";
import  { AuthPanel }  from "../features/auth/AuthPanel.tsx";
import  Orders   from "../features/orders/Orders.tsx";
import Profile from "../features/profile/Profile.tsx";
import Contact from "../features/contact/Contact.tsx";

import AuthPopUp from "../shared/AuthPopUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Products },

      { path: "delivery", Component: Delivery },
      {
        path: "profile",
        Component: Profile,
      },
      { path: "contact", Component: Contact },
      { path: "auth", Component: AuthPopUp },
      { path: "auth/signup", Component: AuthPanel },
      { path: "auth/login", Component: AuthPanel },
      { path: "orders", Component: Orders },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
