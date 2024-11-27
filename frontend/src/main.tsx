import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import AppRouter from "./routes/AppRouter.tsx";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CookiesProvider defaultSetOptions={{path: "/"}}>
            <RouterProvider router={AppRouter} />
        </CookiesProvider>
    </StrictMode>
);
