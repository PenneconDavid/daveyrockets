import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import logo from "../components/images/logo.jpg"; // Adjust the path to your logo image

const Navigation = () => {
  const { auth, handleLogout } = React.useContext(AuthContext);

  return (
    <>
      <nav className="bg-[#282828] p-4 flex justify-between items-center flex-wrap">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-white font-bold text-lg mr-4">
            &#123; David Seibold &#125;
          </span>
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
        </div>
        <ul className="flex space-x-6 flex-col sm:flex-row sm:space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="text-white hover:text-gray-400">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-white hover:text-gray-400">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-400">
              Contact
            </Link>
          </li>
          {!auth.isAuthenticated ? (
            <li>
              <Link to="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/admin-dashboard"
                  className="text-white hover:text-gray-400"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-400"
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
          alt="logo"
          className="w-40 h-40 sm:w-80 sm:h-80 rounded-full"
        />
      </div>
    </>
  );
};

export default Navigation;
