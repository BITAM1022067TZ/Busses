import React, { useState } from 'react';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { stations, routes } from '../../data/mockData';

const StationsTab = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [newStation, setNewStation] = useState({ name: '', routeId: routes[0]?.id || '', order: 1 });
  const [editingStation, setEditingStation] = useState(null);
  const [routeStations, setRouteStations] = useState(() => {
    return routes.map(route => {
      return {
        ...route,
        stations: stations
          .filter(s => s.routeId === route.id)
          .sort((a, b) => a.order - b.order)
      };
    });
  });

  const handleAddStation = (routeId) => {
    if (!newStation.name.trim()) return;
    
    const newStationObj = {
      id: Date.now(),
      name: newStation.name,
      routeId: routeId,
      order: newStation.order
    };
    
    setRouteStations(prev => 
      prev.map(route => 
        route.id === routeId 
          ? { 
              ...route, 
              stations: [...route.stations, newStationObj].sort((a, b) => a.order - b.order) 
            } 
          : route
      )
    );
    
    setNewStation({ name: '', routeId: routes[0]?.id || '', order: 1 });
    setIsAdding(false);
  };

  const handleDeleteStation = (routeId, stationId) => {
    setRouteStations(prev => 
      prev.map(route => 
        route.id === routeId 
          ? { 
              ...route, 
              stations: route.stations.filter(s => s.id !== stationId) 
            } 
          : route
      )
    );
  };

  const handleMoveStation = (routeId, stationId, direction) => {
    setRouteStations(prev => 
      prev.map(route => {
        if (route.id !== routeId) return route;
        
        const stations = [...route.stations];
        const index = stations.findIndex(s => s.id === stationId);
        
        if ((direction === 'up' && index === 0) || 
            (direction === 'down' && index === stations.length - 1)) {
          return route;
        }
        
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [stations[index], stations[newIndex]] = [stations[newIndex], stations[index]];
        
        // Update order numbers
        return {
          ...route,
          stations: stations.map((s, i) => ({ ...s, order: i + 1 }))
        };
      })
    );
  };

  const handleEditStation = (routeId, station) => {
    setEditingStation(station);
    setNewStation({ name: station.name, routeId, order: station.order });
  };

  const handleUpdateStation = () => {
    if (!newStation.name.trim() || !editingStation) return;
    
    setRouteStations(prev => 
      prev.map(route => 
        route.id === newStation.routeId 
          ? { 
              ...route, 
              stations: route.stations.map(s => 
                s.id === editingStation.id 
                  ? { ...s, name: newStation.name, order: newStation.order } 
                  : s
              ).sort((a, b) => a.order - b.order)
            } 
          : route
      )
    );
    
    setEditingStation(null);
    setNewStation({ name: '', routeId: routes[0]?.id || '', order: 1 });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Stations</h2>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingStation(null);
            setNewStation({ 
              name: '', 
              routeId: routes[0]?.id || '', 
              order: stations.filter(s => s.routeId === routes[0]?.id).length + 1 
            });
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New Station</span>
        </button>
      </div>

      {(isAdding || editingStation) && (
        <div className="card mb-8">
          <h3 className="font-semibold text-lg mb-4">
            {editingStation ? 'Edit Station' : 'Add New Station'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
              <select
                value={newStation.routeId}
                onChange={(e) => {
                  const routeId = parseInt(e.target.value);
                  const stationCount = stations.filter(s => s.routeId === routeId).length;
                  setNewStation(prev => ({
                    ...prev,
                    routeId,
                    order: stationCount + 1
                  }));
                }}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              >
                {routes.map(route => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
              <input
                type="text"
                value={newStation.name}
                onChange={(e) => setNewStation(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter station name"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input
                type="number"
                min="1"
                value={newStation.order}
                onChange={(e) => setNewStation(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingStation(null);
                setNewStation({ name: '', routeId: routes[0]?.id || '', order: 1 });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingStation ? handleUpdateStation : () => handleAddStation(newStation.routeId)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {editingStation ? 'Update Station' : 'Add Station'}
            </button>
          </div>
        </div>
      )}

      {routeStations.map((route) => (
        <div key={route.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-purple-50 p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-gray-800">
              {route.name} ({route.from} → {route.to})
            </h3>
          </div>
          
          {route.stations.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No stations added for this route yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {route.stations.map((station) => (
                <div key={station.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={() => handleMoveStation(route.id, station.id, 'up')}
                        className="p-1 text-gray-500 hover:text-purple-600"
                        disabled={station.order === 1}
                      >
                        <ArrowUp size={16} />
                      </button>
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {station.order}
                      </div>
                      <button 
                        onClick={() => handleMoveStation(route.id, station.id, 'down')}
                        className="p-1 text-gray-500 hover:text-purple-600"
                        disabled={station.order === route.stations.length}
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">{station.name}</span>
                      <div className="text-sm text-gray-500 mt-1">Stop #{station.order}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditStation(route.id, station)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                      title="Edit station"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteStation(route.id, station.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      title="Delete station"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StationsTab;