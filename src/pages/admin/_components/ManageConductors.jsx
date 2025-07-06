// src/pages/admin/ManageConductors.js
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ManageConductors = () => {
  const [conductors, setConductors] = useState([
    { id: 1, name: 'Ali Musa', phone: '0712345678', assignedBus: 'T123ABC' }
  ]);

  const [newConductor, setNewConductor] = useState({ name: '', phone: '', assignedBus: '' });

  const handleAdd = () => {
    if (!newConductor.name || !newConductor.phone || !newConductor.assignedBus) return;
    setConductors([...conductors, { id: Date.now(), ...newConductor }]);
    setNewConductor({ name: '', phone: '', assignedBus: '' });
  };

  const handleDelete = (id) => {
    setConductors(conductors.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Manage Conductors</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          value={newConductor.name}
          onChange={(e) => setNewConductor({ ...newConductor, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newConductor.phone}
          onChange={(e) => setNewConductor({ ...newConductor, phone: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Assigned Bus"
          value={newConductor.assignedBus}
          onChange={(e) => setNewConductor({ ...newConductor, assignedBus: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAdd}
          className="col-span-full md:col-span-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Conductor</span>
        </button>
      </div>

      <div className="bg-white rounded shadow divide-y">
        {conductors.map(c => (
          <div key={c.id} className="flex justify-between items-center p-4 hover:bg-gray-50">
            <div>
              <h3 className="font-medium text-gray-800">{c.name}</h3>
              <p className="text-sm text-gray-500">Phone: {c.phone} | Bus: {c.assignedBus}</p>
            </div>
            <button
              onClick={() => handleDelete(c.id)}
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

export default ManageConductors;
