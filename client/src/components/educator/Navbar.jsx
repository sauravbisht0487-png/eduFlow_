import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { isEducator } = useContext(AppContext);
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 py-3 border-b border-gray-300 bg-white">
      <Link to="/">
        <h1 className="text-lg font-semibold">LMS</h1>
      </Link>

      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600 hidden sm:block">
          {user ? `Hi, ${user.fullName}` : ""}
        </p>
        {user ? (
          <UserButton />
        ) : (
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
