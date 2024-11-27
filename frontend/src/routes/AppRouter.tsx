import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import AuthRoute from "./AuthRoute";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <AuthRoute><Home /></AuthRoute>
            },
            {
                path: "/login",
                element: <Login />
            },  
            {
                path: "/register",
                element: <Register />
            }    
        ]
    },
]);

export default AppRouter;
