import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TypingEffect from "react-typing-effect"; // Import the library
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { message,success, jwToken, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || "Something went wrong.";
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-black py-4 shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <TypingEffect
            text="Welcome to QuizGenie"
            speed={100}
            eraseSpeed={100}
            typingDelay={500}
            cursorColor="#FFFFFF"
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 leading-tight"
          />
          <p className="mt-2 text-xl text-gray-300 opacity-75">
            Your AI-powered quiz generator
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white px-4">
        {/* Left Side: Login Form */}
        <div className="relative mx-auto w-full max-w-md bg-[#1E2128] px-6 py-10 shadow-lg rounded-lg">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white">Login</h1>
            <p className="mt-2 text-lg text-gray-400">
              Login below to access your account
            </p>
          </div>
          <form onSubmit={handleLogin} className="mt-6">
            <div className="relative mt-6">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="peer mt-1 w-full border-b-2 border-gray-600 bg-transparent px-0 py-2 placeholder:text-transparent focus:border-blue-500 focus:outline-none transition-all duration-300 text-white"
                autoComplete="off"
                value={loginInfo.email}
              />
              <label
                htmlFor="email"
                className="absolute top-0 left-0 transform -translate-y-1/2 text-sm text-gray-400 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email Address
              </label>
            </div>
            <div className="relative mt-6">
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="peer mt-1 w-full border-b-2 border-gray-600 bg-transparent px-0 py-2 placeholder:text-transparent focus:border-blue-500 focus:outline-none transition-all duration-300 text-white"
                value={loginInfo.password}
              />
              <label
                htmlFor="password"
                className="absolute top-0 left-0 transform -translate-y-1/2 text-sm text-gray-400 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Password
              </label>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold text-black bg-gradient-to-r from-red-500 to-blue-500 rounded-md hover:opacity-90 transition duration-300"
              >
                Login
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-400 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
