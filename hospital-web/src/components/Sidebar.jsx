import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Baby, Syringe, LogOut, Activity } from "lucide-react";
import { auth } from "../config/firebase";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      path: "/register-child",
      icon: <Baby size={20} />,
      label: "Register Newborn",
    },
    {
      path: "/vaccination-records",
      icon: <Syringe size={20} />,
      label: "Vaccination History",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-10">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Activity className="text-primary w-6 h-6" />
        </div>
        <span className="font-bold text-xl text-gray-800 tracking-tight">
          Sontya
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              isActive(item.path)
                ? "bg-primary text-white shadow-md shadow-blue-200"
                : "text-gray-500 hover:bg-blue-50 hover:text-primary"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
