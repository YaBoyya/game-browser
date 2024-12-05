import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BaseLayout from "../layouts/BaseLayout";
import AuthRoute from "./AuthRoute";
import Games from "../pages/Games";
import GameCreate from "../pages/GameCreate";
import GenreCreate from "../pages/GenreCreate";
import PublisherCreate from "../pages/PublisherCreate";
import PlatformCreate from "../pages/PlatformCreate";
import UserGames from "../pages/UserGames";
import GameInfo from "../pages/GameInfo";
import AdminPanel from "../pages/AdminPanel";

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
                path: "/admin",
                element: (
                    <AuthRoute>
                        <AdminPanel />
                    </AuthRoute>
                )
            },
            {
                path: "/admin/create/game",
                element: (
                    <AuthRoute>
                        <GameCreate />
                    </AuthRoute>
                )
            },
            {
                path: "/admin/create/genre",
                element: (
                    <AuthRoute>
                        <GenreCreate />
                    </AuthRoute>
                )
            },
            {
                path: "/admin/create/publisher",
                element: (
                    <AuthRoute>
                        <PublisherCreate />
                    </AuthRoute>
                )
            },
            {
                path: "/admin/create/platform",
                element: (
                    <AuthRoute>
                        <PlatformCreate />
                    </AuthRoute>
                )
            },
            {
                path: "/games",
                element: (
                    <AuthRoute>
                        <UserGames />
                    </AuthRoute>
                )
            },
            {
                path: "/game/:id",
                element: <GameInfo />
            }
        ]
    }
]);

export default AppRouter;
