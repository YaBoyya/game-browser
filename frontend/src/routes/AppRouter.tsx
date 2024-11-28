import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import AuthRoute from "./AuthRoute";
import Games from "../pages/Games";
import GameCreate from "../pages/GameCreate";
import UserGames from "../pages/UserGames";
import GameInfo from "../pages/GameInfo";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Games />
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
                path: "/create",
                element: <GameCreate />
            },
            {
                path: "/games",
                element: <UserGames />
            },
            {
                path: "/game/:id",
                element: <GameInfo />
            }
        ]
    }
]);

export default AppRouter;
