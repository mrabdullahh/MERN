import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
export const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  // console.log(signupInfo);
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if ((!email, !password)) {
      return handleError("Email and Password is required");
    }
    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { jwtToken, name, error, message, success } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("LoggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const errMsg = error.details[0].message;
        console.log("1");
        handleError(errMsg);
      } else if (!success) {
        console.log("2");

        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Your Email...."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your Password...."
          />
        </div>
        <button type="sumbit">Login</button>
        <span>
          Dont have an Account?
          <Link to="/signup"> Signup </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};
