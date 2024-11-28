import {useCookies} from "react-cookie";
import {COOKIE_TOKEN_NAME} from "../constants";
import {useNavigate} from "react-router-dom";

function useLogout() {
    const [, , removeCookie] = useCookies([COOKIE_TOKEN_NAME]);
    const navigate = useNavigate();

    return () => {
        removeCookie(COOKIE_TOKEN_NAME);
        navigate("/login");
    };
}

export default useLogout;
