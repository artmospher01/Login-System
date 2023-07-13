
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Privat from "./componet/authentication/privat";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Privat />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])

export default Router

