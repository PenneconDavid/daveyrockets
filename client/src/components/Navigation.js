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
      <nav className="bg-[#282828] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:justify-between">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-white font-bold text-2xl sm:text-3xl mr-4">
            &#123; David Seibold &#125;
          </span>
          <img
            src={logo}
            alt="David Seibold's personal logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
        </div>

        {/* Center Section - Navigation Links */}
        <ul className="flex flex-col sm:flex-row sm:justify-center sm:space-x-6 text-center sm:text-center">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-400 text-xl sm:text-2xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="text-white hover:text-gray-400 text-xl sm:text-2xl"
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="text-white hover:text-gray-400 text-xl sm:text-2xl"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-gray-400 text-xl sm:text-2xl"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-gray-400 text-xl sm:text-2xl"
            >
              Contact
            </Link>
          </li>
          {!auth.isAuthenticated ? (
            <li>
              <Link
                to="/login"
                className="text-white hover:text-gray-400 text-xl sm:text-2xl"
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/admin-dashboard"
                  className="text-white hover:text-gray-400 text-xl sm:text-2xl"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-400 text-xl sm:text-2xl"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Right Section - City and Clock */}
        <div className="text-white text-right mt-4 sm:mt-0">
          <p className="font-bold text-2xl sm:text-3xl">San Diego, CA</p>
          <p className="text-xl sm:text-3xl text-lime-400 font-mono transition-all duration-500 ease-in-out">
            <i className="fa fa-clock-o mr-2"></i> {currentTime}
          </p>
        </div>
      </nav>

      {/* Centered medium-sized logo below the navigation bar */}
      <div className="flex justify-center p-4 bg-[#282828]">
        <img
          src={logo}
          alt="David Seibold's personal logo"
          className="w-40 h-40 sm:w-80 sm:h-80 rounded-full md:shadow-4xl shadow-black"
        />
      </div>
    </>
  );
};

export default Navigation;
