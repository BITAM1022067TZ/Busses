// src/pages/admin/ManageBuses.js
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ManageBuses = () => {
  const [buses, setBuses] = useState([
    { id: 1, plateNumber: 'T123ABC', capacity: 30, route: 'Mjini to Suza' },
    { id: 2, plateNumber: 'T456XYZ', capacity: 25, route: 'Suza to Mjini' }
  ]);

  const [newBus, setNewBus] = useState({ plateNumber: '', capacity: '', route: '' });

  const handleAddBus = () => {
    if (!newBus.plateNumber.trim() || !newBus.capacity || !newBus.route) return;
    setBuses([
      ...buses,
      { id: Date.now(), ...newBus, capacity: parseInt(newBus.capacity) }
    ]);
    setNewBus({ plateNumber: '', capacity: '', route: '' });
  };

  const handleDeleteBus = (id) => {
    setBuses(buses.filter(bus => bus.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Manage Buses</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Plate Number"
          value={newBus.plateNumber}
          onChange={(e) => setNewBus({ ...newBus, plateNumber: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newBus.capacity}
          onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Route"
          value={newBus.route}
          onChange={(e) => setNewBus({ ...newBus, route: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddBus}
          className="col-span-full md:col-span-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Bus</span>
        </button>
      </div>

      <div className="bg-white rounded shadow divide-y">
        {buses.map(bus => (
          <div key={bus.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
            <div>
              <h3 className="font-medium text-gray-800">{bus.plateNumber}</h3>
              <p className="text-sm text-gray-500">
                Capacity: {bus.capacity} | Route: {bus.route}
              </p>
            </div>
            <button
              onClick={() => handleDeleteBus(bus.id)}
              className="text-red-600 bg-red-100 hover:bg-red-200 p-2 rounded-full"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBuses;
