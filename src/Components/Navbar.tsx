import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? " font-bold text-blue-200" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive ? " font-bold text-blue-200" : ""
            }
          >
            Contacts
          </NavLink>
          <NavLink
            to="/charts-and-maps"
            className={({ isActive }) =>
              isActive ? " font-bold text-blue-200" : ""
            }
          >
            Charts and Maps
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
