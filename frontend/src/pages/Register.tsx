import { useState } from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../components/wrappers/FormWrapper";
import RenderForm from "../components/RenderForm";

function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
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
    <FormWrapper label="Register">
      <form onSubmit={onSubmit}>
        <RenderForm data={credentials} handleInput={handleCredentialChange} />
        <small>Alredy have an account? <Link to="/login">Log In</Link></small>
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