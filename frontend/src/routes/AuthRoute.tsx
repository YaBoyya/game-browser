import { useCookies } from "react-cookie";
import { COOKIE_TOKEN_NAME } from "../constants";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { ChildrenProps } from "../props";

const isTokenValid = () => {
  const [cookies, ,removeCookie] = useCookies([COOKIE_TOKEN_NAME]);
  const token = cookies[COOKIE_TOKEN_NAME]
  try {
    const decodedToken = jwtDecode(token);

    if (decodedToken?.exp && Date.now() < decodedToken.exp * 1000) {
      return true;
    }

    throw new Error();
  } catch (e: any) {
    removeCookie(COOKIE_TOKEN_NAME);
    return false;
  }
}

function AuthRoute({ children }: ChildrenProps) {
  const tokenValidity = isTokenValid();

  console.log(tokenValidity)

  return(
    <>
      {tokenValidity ? children : <Navigate to="/login" />}
    </>
  );
}

export default AuthRoute;