import { useState } from "react";
import { Link } from "react-router-dom";
import FormWrapper from "../components/wrappers/FormWrapper";
import RenderForm from "../components/RenderForm";
import { REGISTERURL } from "../constants";

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
  const onSubmit = async (event: any) => {
    console.log("HI");
    event.preventDefault();
    if(!Object.values(credentials).every((val: string) => val.trim() ? true : false)) {
      // TODO error when data is empty
      console.log(credentials)
      return;
    }

    try {
      // TODO clear errors
      console.log("HI");
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(REGISTERURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.error("Connection timed out");
      } else if (error.name === "TypeError") {
        console.error(error.message);
      } else {
        // perhaps error to input error messages
        console.error(error.message);
      }
      // TODO add method to clear object data
    }
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