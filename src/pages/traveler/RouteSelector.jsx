import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Bus, Navigation, Clock, Users } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { routes, stations, buses } from '../../data/mockData';

const RouteSelector = () => {
  const { selectedRoute, setSelectedRoute } = useAppContext();
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeBus, setActiveBus] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Set active route if one is selected
  useEffect(() => {
    if (selectedRoute) {
      setActiveRoute(selectedRoute);
    } else if (routes.length > 0) {
      setActiveRoute(routes[0]);
    }
  }, [selectedRoute]);
  
  // Set a random active bus for demonstration
  useEffect(() => {
    if (buses.length > 0) {
      const randomBus = buses[Math.floor(Math.random() * buses.length)];
      setActiveBus(randomBus);
    }
  }, []);
  
  // Get stations for the active route
  const routeStations = activeRoute 
    ? stations.filter(s => s.routeId === activeRoute.id).sort((a, b) => a.order - b.order)
    : [];
  
  // Format time
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculate estimated time to station
  const calculateETA = (stationOrder) => {
    if (!activeBus) return 'N/A';
    
    const timePerStation = 15; // minutes
    const timeDifference = Math.abs(stationOrder - activeBus.passengerCount) * timePerStation;
    
    const eta = new Date(currentTime);
    eta.setMinutes(eta.getMinutes() + timeDifference);
    
    return formatTime(eta);
  };

  // Handle route selection
  const handleSelectRoute = () => {
    if (activeRoute) {
      setSelectedRoute(activeRoute);
      navigate('/dashboard/stations');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Select Your Route</h1>
            <p className="text-gray-600">Choose a route and view real-time information</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-4">
        {/* Route Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {routes.map(route => {
            const routeBuses = buses.filter(bus => bus.routeId === route.id);
            const routeStations = stations.filter(s => s.routeId === route.id).sort((a, b) => a.order - b.order);
            
            return (
              <div 
                key={route.id}
                className={`bg-white rounded-xl shadow-lg p-5 transition-all duration-300 border-2 ${
                  activeRoute?.id === route.id 
                    ? 'border-blue-600 transform -translate-y-1' 
                    : 'border-gray-100 hover:border-blue-300'
                }`}
                onClick={() => setActiveRoute(route)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{route.name}</h2>
                    <p className="text-gray-600">{route.from} → {route.to}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm">
                    <Bus size={16} />
                    <span>{routeBuses.length} buses active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-1" />
                    <span>~45-60 min journey</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {routeStations.length} stops
                  </div>
                </div>
                
                <div className="relative h-8 bg-gray-100 rounded-full mb-4">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    style={{ width: `${(routeBuses.length / 3) * 100}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
                    {routeBuses.length > 0 ? 'Good service' : 'No buses available'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">Next bus:</span> 
                    {routeBuses.length > 0 
                      ? ` ${formatTime(new Date(currentTime.getTime() + 5*60000))}` 
                      : ' Not available'}
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeRoute?.id === route.id
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveRoute(route);
                    }}
                  >
                    {activeRoute?.id === route.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Route Details Section */}
        {activeRoute && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{activeRoute.name} Details</h2>
              <button
                onClick={handleSelectRoute}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                Continue with {activeRoute.name}
                <ChevronLeft className="transform rotate-180 ml-1" size={18} />
              </button>
            </div>
            
            {/* Map Visualization */}
            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 overflow-hidden mb-6">
              {/* Route Line */}
              <div className="absolute top-1/2 left-10 right-10 h-1 bg-blue-500 transform -translate-y-1/2"></div>
              
              {/* Stations */}
              {routeStations.map((station, index) => (
                <div 
                  key={station.id}
                  className="absolute"
                  style={{ left: `${(index + 1) * 20}%`, top: '50%' }}
                >
                  <div className="flex flex-col items-center transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <MapPin className="text-blue-600" size={12} />
                    </div>
                    <div className="mt-1 text-center max-w-[80px]">
                      <div className="font-medium text-xs">{station.name}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Active Bus */}
              {activeBus && activeBus.routeId === activeRoute.id && (
                <div 
                  className="absolute top-1/2 animate-pulse"
                  style={{ 
                    left: `${(activeBus.passengerCount) * 20}%`,
                    transform: 'translate(-50%, -50%)' 
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Bus className="text-white" size={20} />
                    </div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {activeBus.plateNumber}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bus Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 flex items-center mb-2">
                  <Navigation className="mr-2" size={18} />
                  Route Information
                </h3>
                <ul className="text-blue-600 space-y-1">
                  <li className="flex justify-between">
                    <span>From:</span>
                    <span className="font-medium">{activeRoute.from}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>To:</span>
                    <span className="font-medium">{activeRoute.to}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total Stops:</span>
                    <span className="font-medium">{routeStations.length}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 flex items-center mb-2">
                  <Clock className="mr-2" size={18} />
                  Schedule
                </h3>
                <ul className="text-green-600 space-y-1">
                  <li className="flex justify-between">
                    <span>First Bus:</span>
                    <span className="font-medium">06:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Last Bus:</span>
                    <span className="font-medium">10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-medium">15-20 min</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 flex items-center mb-2">
                  <Users className="mr-2" size={18} />
                  Current Service
                </h3>
                <ul className="text-purple-600 space-y-1">
                  <li className="flex justify-between">
                    <span>Active Buses:</span>
                    <span className="font-medium">
                      {buses.filter(b => b.routeId === activeRoute.id).length}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Next Bus:</span>
                    <span className="font-medium">
                      {buses.filter(b => b.routeId === activeRoute.id).length > 0 
                        ? formatTime(new Date(currentTime.getTime() + 5*60000)) 
                        : 'None'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium text-green-600">
                      Good Service
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Station List */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Stations on this route:</h3>
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                {routeStations.map((station, index) => (
                  <div key={station.id} className="p-3 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-3 font-bold">
                      {station.order}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{station.name}</div>
                      {activeBus && activeBus.routeId === activeRoute.id && activeBus.passengerCount === station.order && (
                        <div className="text-xs text-yellow-600 flex items-center mt-1">
                          <Bus size={12} className="mr-1" />
                          <span>Bus arriving: {calculateETA(station.order)}</span>
                        </div>
                      )}
                    </div>
                    {index === 0 && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        Start
                      </span>
                    )}
                    {index === routeStations.length - 1 && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        End
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteSelector;yyy