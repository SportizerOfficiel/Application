
import React from "react";
import useForm from "@/Utils/Hooks/useForm";
import axios from "axios";

const Register = () => {
    const [error, setError] = React.useState("");
  
    const registerUser = async (data) => {
      setError("");
      try {
        await axios.post("/api/User", data);
        resetForm();
        alert("User registered successfully!");
      } catch (error) {
        setError(error.response.data);
      }
    };
  
    const [registerFormRef, handleRegisterSubmit, resetForm] = useForm(registerUser);
  
    return (
      <div>
        <h2>Register</h2>
        <form ref={registerFormRef} onSubmit={handleRegisterSubmit}>
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  };

  export default Register