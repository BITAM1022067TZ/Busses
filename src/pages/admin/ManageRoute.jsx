// src/pages/admin/ManageRoutes.js
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([
    { id: 1, name: "Mjini to Suza", from: "Mjini", to: "Suza" },
    { id: 2, name: "Suza to Mjini", from: "Suza", to: "Mjini" }
  ]);

  const [newRoute, setNewRoute] = useState({ from: '', to: '' });

  const handleAddRoute = () => {
    if (!newRoute.from.trim() || !newRoute.to.trim()) return;

    const newRouteObj = {
      id: Date.now(),
      name: `${newRoute.from} to ${newRoute.to}`,
      from: newRoute.from,
      to: newRoute.to
    };

    setRoutes([...routes, newRouteObj]);
    setNewRoute({ from: '', to: '' });
  };

  const handleDeleteRoute = (id) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Routes</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="From"
          value={newRoute.from}
          onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="To"
          value={newRoute.to}
          onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddRoute}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Route</span>
        </button>
      </div>

      <div className="bg-white rounded shadow divide-y">
        {routes.length === 0 ? (
          <p className="p-4 text-gray-500">No routes available.</p>
        ) : (
          routes.map(route => (
            <div key={route.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
              <div>
                <h3 className="font-medium text-gray-800">{route.name}</h3>
                <p className="text-sm text-gray-500">From: {route.from} | To: {route.to}</p>
              </div>
              <button
                onClick={() => handleDeleteRoute(route.id)}
                className="text-red-600 bg-red-100 hover:bg-red-200 p-2 rounded-full"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageRoutes;
