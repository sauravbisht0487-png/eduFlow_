import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  BookOpen,
  Users,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/educator", icon: LayoutDashboard },
  { name: "Add Course", path: "/educator/add-course", icon: PlusSquare },
  { name: "My Courses", path: "/educator/my-courses", icon: BookOpen },
  { name: "Students Enrolled", path: "/educator/student-enrolled", icon: Users },
];

const Sidebar = () => {
  return (
    <div className="w-16 md:w-64 border-r border-gray-300 min-h-screen bg-white">
      <div className="flex flex-col pt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <item.icon size={18} />
            <span className="hidden md:block">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;