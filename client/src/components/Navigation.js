import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from "../components/images/logo.jpg";

const Navigation = () => {
  const { auth, handleLogout } = React.useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString);
    };

    const timer = setInterval(updateTime, 1000); // Update every second
    updateTime(); // Set initial time

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      {/* Arched Navigation Bar */}
      <nav className="relative bg-[#282828] p-6 sm:p-8 flex justify-center items-center h-96">
        {/* Arched Layout */}
        <div className="flex justify-center items-center w-full h-full relative">
          {/* Left - Logo and Title */}
          <div className="absolute left-1/4 top-1/3 transform -rotate-10">
            <span className="text-white font-bold text-xl sm:text-2xl">
              &#123; David Seibold &#125;
            </span>
          </div>

          {/* Navigation Links - Curved Around */}
          <ul className="absolute top-1/4 flex space-x-4 sm:space-x-8 transform">
            <li className="transform rotate-10">
              <Link
                to="/"
                className="text-white hover:text-gray-400 text-xl sm:text-2xl"
              >
                Home
              </Link>
            </li>
            <li className="transform rotate-5">
              <Link
                to="/blogs"
                className="text-white hover:text-gray-400 text-xl sm:text-2xl"
              >
                Blogs
              </Link>
            </li>
            <li className="transform rotate-0">
              <Link
                to="/projects"
                className="text-white hover:text-gray-400 text-xl sm:text-2xl"
              >
                Projects
              </Link>
            </li>
            <li className="transform -rotate-5">
              <Link
                to="/about"
                className="text-white hover:text-gray-400 text-xl sm:text-2xl"
              >
                About
              </Link>
            </li>
            <li className="transform -rotate-10">
              <Link
                to="/contact"
                className="text-white hover:text-gray-400 text-xl sm:text-2xl"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right - City and Clock */}
          <div className="absolute right-1/4 top-1/3 transform rotate-10 text-right">
            <p className="font-bold text-2xl sm:text-3xl text-white">
              San Diego, CA
            </p>
            <p className="text-xl sm:text-3xl text-lime-400 font-mono transition-all duration-500 ease-in-out">
              <i className="fa fa-clock-o mr-2"></i> {currentTime}
            </p>
          </div>
        </div>
      </nav>

      {/* Centered large logo below navigation */}
      <div className="flex justify-center p-4 bg-[#282828]">
        <img
          src={logo}
          alt="David Seibold's personal logo"
          className="w-40 h-40 sm:w-80 sm:h-80 rounded-full md:shadow-2xl shadow-black"
        />
      </div>
    </>
  );
};

export default Navigation;
