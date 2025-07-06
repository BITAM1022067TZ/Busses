// src/pages/admin/ManageUsers.js
import React from 'react';

const ManageUsers = () => {
  const users = [
    { id: 1, username: 'admin1', email: 'admin1@example.com', role: 'Admin' },
    { id: 2, username: 'traveller1', email: 'traveller@example.com', role: 'Traveller' },
    { id: 3, username: 'conductor1', email: 'conductor@example.com', role: 'Conductor' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Manage Users</h2>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
