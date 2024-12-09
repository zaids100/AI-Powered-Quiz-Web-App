import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiMagicLamp } from "react-icons/gi";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-black text-white">
      {/* Left side: Logo with Genie Icon */}
      <div className="flex items-center space-x-2">
        <div className="text-3xl font-bold bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
          QuizGenie
        </div>
        <GiMagicLamp className="text-3xl" /> {/* Genie (magic) icon */}
      </div>

      {/* Right side: User icon with dropdown */}
      <div className="relative flex items-center space-x-2">
        <span>Hello, {localStorage.getItem("loggedInUser")}</span>
        <FaUser 
          className="text-xl cursor-pointer" 
          onClick={toggleDropdown} 
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
