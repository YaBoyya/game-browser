import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import AuthRoute from "./AuthRoute";
import Games from "../pages/Games";
import GameCreate from "../pages/GameCreate";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: (
                  <Home />
                )
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            { 
              path: "/games",
              element: <Games />
            },
            {
                path: "/games/create",
                element: <GameCreate />
            }
        ]
    }
]);

export default AppRouter;
