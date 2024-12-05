import {FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import FormWrapper from "../components/wrappers/FormWrapper";
import RenderForm from "../components/RenderForm";
import ErrorMessage from "../components/ErrorMessage";
import {COOKIE_TOKEN_NAME, COOKIE_ROLE_NAME, LOGINURL} from "../constants";
import {useCookies} from "react-cookie";

function Login() {
    const credentialsParams = {
        username: "",
        password: ""
    };
    const [credentials, setCredentials] = useState(credentialsParams);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [, setCookie] = useCookies([COOKIE_TOKEN_NAME, COOKIE_ROLE_NAME]);
    const navigate = useNavigate();

    const handleCredentialChange = (value: string, key: string) => {
        setCredentials({
            ...credentials,
            [key]: value
        });
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage("");

        if (!Object.values(credentials).every((val: string) => (val.trim() ? true : false))) {
            setErrorMessage("Empty credentials");
            return;
        }

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(LOGINURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
                signal: controller.signal
            });

            clearTimeout(timeout);

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }
            const data = await response.json();

            if (!data.token) {
                console.error("Token value is missing in the response");
            }

            setCookie(COOKIE_TOKEN_NAME, data.token);
            setCookie(COOKIE_ROLE_NAME, data.role);
            navigate("/");
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }

            setCredentials(credentialsParams);
        }
    };

    return (
        <FormWrapper label="Login">
            <ErrorMessage msg={errorMessage} />
            <form onSubmit={onSubmit}>
                <RenderForm data={credentials} handleInput={handleCredentialChange} />
                <small>
                    Don't have an account? <Link to="/register">Register</Link>
                </small>
                <button className="text-white w-full p-3 bg-blue-400">Login</button>
            </form>
        </FormWrapper>
    );
}

export default Login;
