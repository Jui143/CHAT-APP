import React, { useState } from "react";
import "../Styles/LoginSignup.css";
import SignupNavbar from "../Components/SignupNavbar.jsx";
import { toast } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const register = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(`${backendUrl}/api/signup`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
      }),
    });
    console.log("dataResponse", dataResponse);
    const dataAPI = await dataResponse.json();

    if (dataAPI.success) {
      toast.success(dataAPI.message);
      navigate("/loginsignup");
    }
    if (dataAPI.error) {
      toast.error(dataAPI.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(`${backendUrl}/api/login`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email1,
        password: password1,
      }),
    });

    const dataAPI = await dataResponse.json();

    if (dataAPI.success) {
      toast.success(dataAPI.message);

      navigate("/chat");
      // fetchUserDetails();
    }

    if (dataAPI.error) {
      toast.error(dataAPI.message);
    }
  };

  return (
    <>
      <SignupNavbar />
      <div id="body" className="pt-5">
        <div
          className={`containersnl ${
            isSignUp ? "right-panel-active" : "left-panel-active"
          }`}
        >
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form id="signupform" className="form" onSubmit={register}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name*"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                className="ip"
              />
              <input
                type="email"
                placeholder="Email*"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="ip"
              />
              <input
                type="text"
                placeholder="Username*"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
                className="ip"
              />

              <input
                type="password"
                placeholder="Password*"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="ip"
              />
              <button className="button m-2">Sign Up</button>
              <h5>{signUpStatus}</h5>
            </form>
          </div>

          {/* Login Form */}
          <div className="form-container sign-in-container">
            <form action="/" className="form" onSubmit={login}>
              <h1>Login</h1>
              <input
                type="email"
                placeholder="Email*"
                onChange={(e) => {
                  setEmail1(e.target.value);
                }}
                required
                className="ip"
              />
              <input
                type="password"
                placeholder="Password*"
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
                required
                className="ip"
              />
              <a href="/" className="a">
                Forgot your password?
              </a>
              <button className="button">Login</button>
              <h5>{loginStatus}</h5>
            </form>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p className="mt-4">
                  To keep connected with us please login with your personal info
                </p>
                <button className="button ghost mt-4" onClick={togglePanel}>
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend, new here?</h1>
                <p className="mt-4">
                  Enter your personal details and start the journey with us
                </p>
                <button className="button ghost mt-4" onClick={togglePanel}>
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
