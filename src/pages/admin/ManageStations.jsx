import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const initialStations = [
  { id: 1, name: 'Suza' },
  { id: 2, name: 'Posta' },
  { id: 3, name: 'Kontena' },
];

const ManageStations = () => {
  const [stations, setStations] = useState(initialStations);
  const [newStation, setNewStation] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const handleAdd = () => {
    if (newStation.trim() === '') return;
    const newId = stations.length + 1;
    setStations([...stations, { id: newId, name: newStation }]);
    setNewStation('');
  };

  const handleDelete = (id) => {
    setStations(stations.filter((station) => station.id !== id));
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleUpdate = () => {
    setStations(
      stations.map((station) =>
        station.id === editingId ? { ...station, name: editingName } : station
      )
    );
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Stations</h2>

      {/* Add Station */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter station name"
          value={newStation}
          onChange={(e) => setNewStation(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-60"
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={18} /> Add Station
        </button>
      </div>

      {/* Station Table */}
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">#</th>
            <th className="text-left px-4 py-2">Station Name</th>
            <th className="text-left px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station, index) => (
            <tr key={station.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {editingId === station.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  station.name
                )}
              </td>
              <td className="px-4 py-2 flex gap-2">
                {editingId === station.id ? (
                  <button
                    onClick={handleUpdate}
                    className="text-green-600 font-semibold"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(station.id, station.name)}
                    className="text-blue-600"
                  >
                    <Edit size={18} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(station.id)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {stations.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-400">
                No stations added.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStations;
