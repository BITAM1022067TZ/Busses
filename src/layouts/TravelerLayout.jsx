import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TravelerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="traveler" />
      <div className="max-w-4xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default TravelerLayout;
