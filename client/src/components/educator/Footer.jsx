
import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-center border-t border-gray-300 py-4 bg-white">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} LMS. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
