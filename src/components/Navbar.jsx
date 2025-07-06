// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  Home, 
  User, 
  LogOut, 
  Settings, 
  Menu,
  X
} from 'lucide-react';

const Navbar = ({ userType, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('choose-route')) return 'Choose Route';
    if (path.includes('stations')) return 'Select Station';
    if (path.includes('bus-availability')) return 'Bus Availability';
    if (path.includes('seat-selection')) return 'Select Seat';
    if (path.includes('ticket-booking')) return 'Book Ticket';
    if (path.includes('receipt')) return 'Your Ticket';
    if (path.includes('route-map')) return 'Route Map';
    if (path.includes('admin')) return 'Admin Dashboard';
    if (path.includes('conductor')) return 'Conductor Dashboard';
    return `${userType} Dashboard`;
  };

  const handleLogout = () => {
    setShowDropdown(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left section */}
        <div className="flex items-center">
          {location.pathname !== '/dashboard/home' && location.pathname !== '/admin' && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 mr-2"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <div className="w-6 h-6 flex items-center justify-center font-bold">BS</div>
            </div>
            <h1 className="text-xl font-bold text-gray-800 hidden md:block">
              {getTitle()}
            </h1>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-800 md:hidden">
          {getTitle()}
        </h1>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/dashboard/home')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Home size={20} />
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile dropdown menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t mt-4 py-2 px-4 absolute left-0 right-0 shadow-lg">
          <button 
            onClick={() => {
              navigate('/dashboard/home');
              setShowMobileMenu(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Home size={16} className="mr-2" />
            Home
          </button>
          <button 
            onClick={() => {
              navigate('/settings');
              setShowMobileMenu(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Settings size={16} className="mr-2" />
            Settings
          </button>
          <button 
            onClick={() => {
              handleLogout();
              setShowMobileMenu(false);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;