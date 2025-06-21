import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Users, ChevronLeft, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { routes, stations, buses } from '../../data/mockData';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ConductorDashboard = () => {
  const navigate = useNavigate();
  const { selectedRoute, setSelectedRoute } = useAppContext();
  const [activeBus, setActiveBus] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [passengerCount, setPassengerCount] = useState(0);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // Set active bus when route is selected
  useEffect(() => {
    if (selectedRoute) {
      const routeBus = buses.find(bus => bus.routeId === selectedRoute.id);
      if (routeBus) {
        setActiveBus(routeBus);
        setPassengerCount(routeBus.passengerCount);
        
        // Get stations for this route
        const routeStations = stations
          .filter(s => s.routeId === selectedRoute.id)
          .sort((a, b) => a.order - b.order);
        
        if (routeStations.length > 0) {
          setCurrentLocation(routeStations[0].position);
        }
      }
    }
  }, [selectedRoute]);

  // Get stations for active route
  const routeStations = selectedRoute
    ? stations
        .filter(s => s.routeId === selectedRoute.id)
        .sort((a, b) => a.order - b.order)
        .map(station => ({
          ...station,
          position: [
            -6.8167 + (0.01 * station.order),
            39.2833 - (0.01 * station.order)
          ]
        }))
    : [];

  // Simulate bus movement along route
  useEffect(() => {
    if (isMoving && routeStations.length > 1) {
      const interval = setInterval(() => {
        setCurrentStationIndex(prevIndex => {
          const newIndex = (prevIndex + 1) % routeStations.length;
          setCurrentLocation(routeStations[newIndex].position);
          return newIndex;
        });
      }, 5000); // Move to next station every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isMoving, routeStations]);

  // Update location manually
  const updateLocation = () => {
    const nextIndex = (currentStationIndex + 1) % routeStations.length;
    setCurrentStationIndex(nextIndex);
    setCurrentLocation(routeStations[nextIndex].position);
  };

  // Update passenger count
  const updatePassengerCount = (count) => {
    setPassengerCount(Math.max(0, Math.min(activeBus?.totalSeats || 50, count)));
  };

  // Format station name
  const getStationName = (index) => {
    return routeStations[index]?.name || 'Unknown Station';
  };

  // Custom bus icon for mini map
  const miniBusIcon = L.divIcon({
    className: 'bus-marker-mini',
    html: `<div class="bus-icon-mini"><Bus size="16" /></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <button
            onClick={() => {
              setSelectedRoute(null);
              navigate('/conductor');
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bus Operator Dashboard</h1>
            <p className="text-gray-600">Manage your bus operations in real-time</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {!selectedRoute ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">Select Your Route</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 
                             cursor-pointer transition-all duration-200 hover:shadow-lg"
                  onClick={() => setSelectedRoute(route)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Bus className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{route.name}</h3>
                      <p className="text-gray-600">{route.from} → {route.to}</p>
                    </div>
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Select Route
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Bus Info Header */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Bus className="mr-2 text-green-600" size={24} />
                    {activeBus?.plateNumber} - {selectedRoute.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {getStationName(currentStationIndex)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedRoute(null);
                    setActiveBus(null);
                  }}
                  className="mt-3 md:mt-0 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Change Route
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Current Location Card with Mini Map */}
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="p-4">
                  <h3 className="text-sm text-gray-500 flex items-center">
                    <MapPin className="mr-2 text-blue-600" size={16} />
                    Current Location
                  </h3>
                  <p className="font-semibold truncate">{getStationName(currentStationIndex)}</p>
                </div>
                
                {currentLocation && (
                  <div className="h-40 relative">
                    <MapContainer 
                      center={currentLocation} 
                      zoom={15} 
                      style={{ height: '100%', width: '100%' }}
                      zoomControl={false}
                      dragging={false}
                      doubleClickZoom={false}
                      scrollWheelZoom={false}
                      attributionControl={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker 
                        position={currentLocation}
                        icon={miniBusIcon}
                      />
                    </MapContainer>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      Zoom: 15x
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow p-4 flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Passengers</h3>
                  <p className="font-semibold">
                    {passengerCount} <span className="text-gray-400">/ {activeBus?.totalSeats || 50}</span>
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-4 flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Navigation className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Next Station</h3>
                  <p className="font-semibold">
                    {getStationName((currentStationIndex + 1) % routeStations.length)}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Control */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2 text-blue-600" size={20} />
                  Location Control
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Auto-move between stations</span>
                    <button
                      onClick={() => setIsMoving(!isMoving)}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        isMoving 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {isMoving ? 'Stop Moving' : 'Start Moving'}
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">Manual Location Update</h3>
                    <div className="flex flex-wrap gap-2">
                      {routeStations.map((station, index) => (
                        <button
                          key={station.id}
                          onClick={() => {
                            setCurrentStationIndex(index);
                            setCurrentLocation(station.position);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            currentStationIndex === index
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {station.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={updateLocation}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    <Navigation className="mr-2" size={18} />
                    Move to Next Station
                  </button>
                </div>
              </div>
              
              {/* Passenger Control */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="mr-2 text-green-600" size={20} />
                  Passenger Management
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Current Passengers</span>
                      <span className="text-2xl font-bold">{passengerCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${(passengerCount / (activeBus?.totalSeats || 50)) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Capacity: {activeBus?.totalSeats || 50} passengers
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updatePassengerCount(passengerCount - 1)}
                      disabled={passengerCount <= 0}
                      className={`py-3 rounded-lg font-bold text-white ${
                        passengerCount <= 0 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      -1 Passenger
                    </button>
                    <button
                      onClick={() => updatePassengerCount(passengerCount + 1)}
                      disabled={passengerCount >= (activeBus?.totalSeats || 50)}
                      className={`py-3 rounded-lg font-bold text-white ${
                        passengerCount >= (activeBus?.totalSeats || 50)
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      +1 Passenger
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-2">Set Exact Count</h3>
                    <div className="flex">
                      <input
                        type="number"
                        min="0"
                        max={activeBus?.totalSeats || 50}
                        value={passengerCount}
                        onChange={(e) => updatePassengerCount(parseInt(e.target.value) || 0)}
                        className="flex-1 p-3 border border-gray-300 rounded-l-lg"
                      />
                      <button
                        onClick={() => updatePassengerCount(activeBus?.passengerCount || 0)}
                        className="bg-gray-200 hover:bg-gray-300 px-4 rounded-r-lg"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bus Information */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Bus Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Route Details</h3>
                  <p className="text-gray-600">
                    <span className="font-medium">From:</span> {selectedRoute.from}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">To:</span> {selectedRoute.to}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Stations:</span> {routeStations.length}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Bus Status</h3>
                  <p className="text-gray-600">
                    <span className="font-medium">Plate Number:</span> {activeBus?.plateNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Capacity:</span> {activeBus?.totalSeats || 50} passengers
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span> 
                    <span className="ml-1 px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                      In Service
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom styles */}
      <style jsx="true">{`
        .bus-marker-mini {
          background: transparent;
          border: none;
        }
        .bus-icon-mini {
          width: 24px;
          height: 24px;
          background: #f59e0b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 rgba(245, 158, 11, 0.4);
          animation: pulse-mini 1.5s infinite;
        }
        @keyframes pulse-mini {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
      `}</style>
    </div>
  );
};

export default ConductorDashboard;