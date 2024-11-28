import {Outlet} from "react-router-dom";

function BaseLayout() {
    return (
        <div className="flex flex-col items-center place-content-center min-h-screen">
            {/* TODO navbar perhaps */}
            <Outlet />
        </div>
    );
}

export default BaseLayout;
