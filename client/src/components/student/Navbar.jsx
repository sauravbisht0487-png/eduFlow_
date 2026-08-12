import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <>
      <style>{`
        @keyframes nav-slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes nav-pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.45); }
          50% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
        }
        @keyframes nav-logo-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.06) rotate(-2deg); }
        }
        .nav-container {
          animation: nav-slide-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .nav-logo {
          animation: nav-logo-breathe 3.5s ease-in-out infinite;
        }
        .nav-login-btn {
          animation: nav-pulse-ring 2.4s ease-in-out infinite;
        }
        .nav-link {
          position: relative;
          padding-bottom: 3px;
        }
        .nav-underline {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 100%;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover .nav-underline,
        .nav-link-active .nav-underline {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-container, .nav-logo, .nav-login-btn { animation: none !important; }
        }
      `}</style>

      <div
        className={`nav-container sticky top-0 z-50 flex flex-col gap-3 px-4 py-4 border-b border-gray-200 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-10 md:px-14 lg:px-36 transition-colors duration-300 ${
          isCourseListPage ? "bg-white/90" : "bg-cyan-100/70"
        }`}
      >
        <div className="flex items-center justify-between w-full sm:w-auto">
          <img
            src={assets.logo}
            alt="Logo"
            onClick={() => navigate("/")}
            className="nav-logo w-24 cursor-pointer sm:w-28 lg:w-32"
          />

          <div className="sm:hidden">
            {user ? (
              <UserButton />
            ) : (
              <button
                onClick={() => openSignIn()}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {user && (
          <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-6">
            <button
              onClick={() => navigate("/educator")}
              onMouseEnter={() => setHoveredLink("educator")}
              onMouseLeave={() => setHoveredLink(null)}
              className={`nav-link text-left w-fit transition-colors duration-200 ${
                hoveredLink === "educator" ? "text-blue-600" : "hover:text-blue-600"
              }`}
            >
              {isEducator ? "Educator dashboard" : "Become educator"}
              <span className="nav-underline" />
            </button>
            <Link
              to="/my-enrollments"
              className="nav-link text-left w-fit hover:text-blue-600 transition-colors duration-200"
            >
              My Enrollments
              <span className="nav-underline" />
            </Link>
          </div>
        )}

        <div className="hidden sm:block">
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="nav-login-btn bg-blue-600 text-white px-5 py-2 rounded-full transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;