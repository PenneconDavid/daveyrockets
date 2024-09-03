import React from "react";
import { Link } from "react-router-dom";
import logo from "../components/images/logo.jpg";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-center px-4">
      <img src={logo} alt="Logo" className="w-40 h-40 mb-8" />
      <h1 className="text-6xl font-extrabold text-lime-500 mb-4">404</h1>
      <p className="text-2xl text-[#F3EACC] mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <p className="text-lg text-[#F3EACC] mb-8">
        It looks like you might be lost. Don’t worry, we’ll help you find your
        way back.
      </p>
      <Link
        to="/"
        className="bg-lime-600 text-white px-6 py-3 rounded-full text-lg hover:bg-lime-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
