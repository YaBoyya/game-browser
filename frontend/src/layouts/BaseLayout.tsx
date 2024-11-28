import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

function BaseLayout() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center place-content-center min-h-screen">
                <Outlet />
            </div>
        </>
    );
}

export default BaseLayout;
