import {createBrowserRouter} from "react-router-dom";
import Home from "./Home";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
]);

export default AppRouter;
