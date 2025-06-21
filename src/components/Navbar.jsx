// src/components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Home, MapPin, Bus, Ticket, User } from 'lucide-react';

const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('choose-route')) return 'Choose Route';
    if (path.includes('stations')) return 'Select Station';
    if (path.includes('bus-availability')) return 'Bus Availability';
    if (path.includes('seat-selection')) return 'Select Seat';
    if (path.includes('ticket-booking')) return 'Book Ticket';
    if (path.includes('receipt')) return 'Your Ticket';
    if (path.includes('route-map')) return 'Route Map';
    return 'Traveler Dashboard';
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {location.pathname !== '/dashboard/home' && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 mr-2"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <div className="flex items-center space-x-3">
            <Bus className="text-blue-600" size={28} />
            <h1 className="text-xl font-bold text-gray-800">{getTitle()}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/dashboard/home')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Home size={20} />
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;