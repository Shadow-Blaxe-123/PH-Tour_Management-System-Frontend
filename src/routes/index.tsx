import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import Verify from "@/pages/Verify";
import generateRoute from "@/utils/generateRoute";
import { createBrowserRouter } from "react-router";
import { adminSideBarItems } from "./adminSideBarItems";
import { userSideBarItems } from "./userSideBarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoute(adminSideBarItems)],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [...generateRoute(userSideBarItems)],
  },
  {
    Component: LoginPage,
    path: "/login",
  },
  {
    Component: RegisterPage,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
]);
