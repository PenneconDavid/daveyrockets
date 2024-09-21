import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from "../components/images/logo.jpg"; // Adjust the path to your logo image
import "font-awesome/css/font-awesome.min.css"; // FontAwesome for the clock icon

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
      <nav className="bg-[#282828] p-4 flex justify-between items-center flex-wrap">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-[#F3EACC] font-bold text-lg mr-4">
            &#123; David Seibold &#125;
          </span>
          <img
            src={logo}
            alt="David Seibold's personal logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
        </div>
        <ul className="flex space-x-6 flex-col sm:flex-row sm:space-x-6">
          <li>
            <Link to="/" className="text-[#F3EACC] hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="text-[#F3EACC] hover:text-gray-400">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-[#F3EACC] hover:text-gray-400">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-[#F3EACC] hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-[#F3EACC] hover:text-gray-400">
              Contact
            </Link>
          </li>
          {!auth.isAuthenticated ? (
            <li>
              <Link to="/login" className="text-[#F3EACC] hover:text-gray-400">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/admin-dashboard"
                  className="text-[#F3EACC] hover:text-gray-400"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-[#F3EACC] hover:text-gray-400"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        {/* San Diego, CA and Time Section */}
        <div className="text-[#F3EACC] text-center sm:text-right mt-4 sm:mt-0">
          <p className="font-bold">San Diego, CA</p>
          <p className="text-lg text-lime-400 font-mono transition-all duration-500 ease-in-out">
            <i className="fa fa-clock-o mr-2"></i> {currentTime}
          </p>
        </div>
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
