import {Link} from "react-router-dom";
import {COOKIE_TOKEN_NAME, COOKIE_ROLE_NAME} from "../constants";
import {useCookies} from "react-cookie";
import useLogout from "../hooks/useLogout";

function Page({link, name}) {
    return (
        <Link to={link}>
            <div className="text-center place-content-center p-2 h-full text-xl">{name}</div>
        </Link>
    );
}

function Home() {
    return (
        <Link to="/">
            <div className="text-3xl text-center place-content-center p-2 h-full font-medium">Game Browser</div>
        </Link>
    );
}

function Logout() {
    return (
        <div className="text-center place-content-center p-2 h-full text-xl cursor-pointer" onClick={useLogout()}>
            Logout
        </div>
    );
}

function Navbar() {
    const [cookie] = useCookies([COOKIE_TOKEN_NAME]);
    return (
        <div className="flex flex-row z-10 justify-between p-3 align-center w-screen h-20 bg-blue-300 sticky top-0 overflow-hidden">
            {Home()}
            <div className="flex-row flex">
                {cookie[COOKIE_ROLE_NAME] == "admin" ? (
                    <>
                        <Page link="/admin/" name="Admin Panel" />
                    </>
                ) : (
                    <></>
                )}
                {cookie[COOKIE_TOKEN_NAME] ? (
                    <>
                        <Page link="/games/" name="My Games" />
                        <Logout />
                    </>
                ) : (
                    <Page link="/login" name="Login" />
                )}
            </div>
        </div>
    );
}

export default Navbar;
