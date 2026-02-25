import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.tsx";
import "../styles/main.scss"
import { About } from "../pages/About.jsx";
import Delivery from "../pages/Delivery.tsx";
import { Products } from "../features/products/Products.tsx";
import { AuthPanel } from "../features/auth/AuthPanel.tsx"

import Profile from "../features/profile/Profile.tsx";
import Contact from "../features/contact/Contact.tsx";

import AuthPopUp from "../shared/AuthPopUp.tsx";
import { Admin } from "../features/auth/Admin.tsx";
import Orders from "../features/orders/Orders.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Products },
      { path: "about", Component: About },

      { path: "delivery", Component: Delivery },
      {
        path: "profile",
        Component: Profile
      },
      { path: "contact", Component: Contact },
      { path: "auth", Component: AuthPopUp },
      { path: "auth/signup", Component: AuthPanel },

      { 
        path: "admin", 
        Component: Admin,
        children: [ 
          { path: "orders", Component: Orders },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
