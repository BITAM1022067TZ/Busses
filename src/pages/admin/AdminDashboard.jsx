import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import StationsTab from './StationsTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('routes');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <button
          onClick={() => setActiveTab(activeTab === 'routes' ? 'stations' : 'routes')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>{activeTab === 'routes' ? 'Add Station' : 'Add Route'}</span>
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('routes')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'routes'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manage Routes
          </button>
          <button
            onClick={() => setActiveTab('stations')}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'stations'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manage Stations
          </button>
        </nav>
      </div>

      {activeTab === 'routes' && (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Mjini to Suza</h3>
                <p className="text-gray-600">Mjini → Suza</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stations' && <StationsTab />}
    </div>
  );
};

export default AdminDashboard;
