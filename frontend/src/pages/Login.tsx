import { useState } from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../components/wrappers/FormWrapper";
import RenderForm from "../components/RenderForm";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleCredentialChange = (value: string, key: string) => {
    setCredentials({
      ...credentials,
      [key]: value
    });
  };

  // TODO type it
  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log("submit");
  }

  return(
    <FormWrapper label="Login">
      <form onSubmit={onSubmit}>
        <RenderForm data={credentials} handleInput={handleCredentialChange} />
        <small>Don't have an account? <Link to="/register">Register</Link></small>
        <button
          className="text-white w-full p-3 bg-blue-400"
        >
          Login
        </button>
      </form>  
    </FormWrapper>
  );
}

export default Login;