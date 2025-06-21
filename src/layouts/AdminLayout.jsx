import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="admin" />
      <div className="max-w-6xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
