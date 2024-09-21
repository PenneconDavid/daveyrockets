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
      <nav className="bg-[#282828] p-6 sm:p-8 flex flex-col sm:flex-row sm:justify-between items-center">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-white font-bold text-xl sm:text-2xl mr-4">
            &#123; David Seibold &#125;
          </span>
          <img
            src={logo}
            alt="David Seibold's personal logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          />
        </div>

        {/* Center Section - City and Clock */}
        <div className="text-white text-center mb-4 sm:mb-0">
          <p className="font-bold text-lg sm:text-xl">San Diego, CA</p>
          <p className="text-lg text-lime-400 font-mono transition-all duration-500 ease-in-out">
            <i className="fa fa-clock-o mr-2"></i> {currentTime}
          </p>
        </div>

        {/* Right Section - Navigation Links */}
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-right">
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-400 text-lg sm:text-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="text-white hover:text-gray-400 text-lg sm:text-xl"
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="text-white hover:text-gray-400 text-lg sm:text-xl"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-gray-400 text-lg sm:text-xl"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-gray-400 text-lg sm:text-xl"
            >
              Contact
            </Link>
          </li>
          {!auth.isAuthenticated ? (
            <li>
              <Link
                to="/login"
                className="text-white hover:text-gray-400 text-lg sm:text-xl"
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/admin-dashboard"
                  className="text-white hover:text-gray-400 text-lg sm:text-xl"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-400 text-lg sm:text-xl"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Centered medium-sized logo below the navigation bar */}
      <div className="flex justify-center p-4 bg-[#282828]">
        <img
          src={logo}
          alt="David Seibold's personal logo"
          className="w-40 h-40 sm:w-80 sm:h-80 rounded-full"
        />
      </div>
    </>
  );
};

export default Navigation;
