import {useCookies} from "react-cookie";
import {COOKIE_TOKEN_NAME} from "../constants";
import {jwtDecode} from "jwt-decode";
import {ChildrenProps, CookieParam} from "../props";
import useLogout from "../hooks/useLogout";
import {useEffect} from "react";

const isTokenValid = (cookies: CookieParam) => {
    const token = cookies[COOKIE_TOKEN_NAME];

    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);

        // checks if current date is lower than token expirys
        return decodedToken?.exp && Date.now() < decodedToken.exp * 1000;
    } catch (e: any) {
        return false;
    }
};

function AuthRoute({children}: ChildrenProps) {
    const [cookies] = useCookies([COOKIE_TOKEN_NAME]);
    const logout = useLogout();

    useEffect(() => {
        if (!isTokenValid(cookies)) {
            logout();
        }
    }, [logout, cookies]);

    return children;
}

export default AuthRoute;
