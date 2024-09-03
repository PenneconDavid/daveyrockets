import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { login } from "../controllers/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      setAuth({ isAuthenticated: true, token: data.token });
      console.log("Login successful:", data);
      navigate("/"); // Redirect to the home page or another route after successful login
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const forgotPasswordUrl = "#";

  return (
    <div
      id="login-container"
      className="flex flex-col justify-center items-center p-10 h-3/4 bg-[#282828] pb-40"
    >
      <h2 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF] font-bold mb-6">
        Login
      </h2>
      <form
        id="login"
        method="POST"
        action="#"
        className="bg-white shadow-lg rounded px-10 pt-8 pb-10 mb-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            className="block text-[#F3EACC] text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-[#F3EACC] leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-[#F3EACC] text-sm font-semibold pb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-900 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gradient-to-r from-[#EFBD19] to-[#8000FF] hover:bg-orange-700 text-[#F3EACC] font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-[#F3EACC] hover:text-orange-700"
            href={forgotPasswordUrl}
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
