import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  const handleLogout = () => {
    logout(); // Call the actual logout logic here
  };

  return (
    <div>
      <header className="bg-base-100 border-base-300 fixed w-full top-0 z-40 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-end">
          <div className="flex items-center space-x-6">
            <Link
              to="/settings"
              className="flex items-center text-gray-600 hover:text-indigo-600"
              title="Settings"
            >
              <FaCog size={20} />
              <span className="ml-2">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center text-gray-600 hover:text-indigo-600"
                  title="Profile"
                >
                  <FaUserCircle size={24} />
                  <span className="ml-2">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 focus:outline-none"
                  title="Logout"
                >
                  <FaSignOutAlt size={20} />
                  <span className="ml-2">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
