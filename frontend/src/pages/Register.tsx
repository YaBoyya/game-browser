import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RenderForm from "../components/RenderForm";
import { REGISTERURL } from "../constants";
import FormWrapper from "../components/wrappers/FormWrapper";
import ErrorMessage from "../components/ErrorMessage";

function Register() {
  const credentialsParams = {
    username: "",
    email: "",
    password: ""
  };
  const [credentials, setCredentials] = useState(credentialsParams);
  const [errorMessage, setErrorMessage] = useState<string>("");
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

    if(!Object.values(credentials).every((val: string) => val.trim() ? true : false)) {
      setErrorMessage("Empty credentials")      
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(REGISTERURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok && response.status !== 201) {
        throw new Error("Invalid credentials");
      }

      navigate("/login");
    } catch (error: any) {
      if (error.name === "AbortError") {
        setErrorMessage("Connection time out")
      } else {
        setErrorMessage(error.message);
      }

      setCredentials(credentialsParams);
    }
  }

  return(
    <FormWrapper label="Register">
      <ErrorMessage msg={errorMessage} />
      <form onSubmit={onSubmit}>
        <RenderForm data={credentials} handleInput={handleCredentialChange} />
        <small>Already have an account? <Link to="/login">Log In</Link></small>
        <button
          className="text-white w-full p-3 bg-blue-400"
        >
          Register
        </button>
      </form>  
    </FormWrapper>
  );
}

export default Register;