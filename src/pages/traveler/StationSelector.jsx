import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ChevronRight, ChevronLeft, Bus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { stations, buses } from '../../data/mockData';

const StationSelector = () => {
  const { selectedRoute, setSelectedStation } = useAppContext();
  const [routeStations, setRouteStations] = useState([]);
  const [activeBus, setActiveBus] = useState(null);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Get stations for the selected route
  useEffect(() => {
    if (selectedRoute) {
      const filteredStations = stations
        .filter(s => s.routeId === selectedRoute.id)
        .sort((a, b) => a.order - b.order);
      
      setRouteStations(filteredStations);
      
      // Set a random bus for this route
      const routeBuses = buses.filter(bus => bus.routeId === selectedRoute.id);
      if (routeBuses.length > 0) {
        setActiveBus(routeBuses[Math.floor(Math.random() * routeBuses.length)]);
      }
    }
  }, [selectedRoute]);
  
  // Format time
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculate estimated time to station
  const calculateETA = (stationOrder) => {
    if (!activeBus) return 'N/A';
    
    const timePerStation = 10; // minutes
    const timeDifference = Math.abs(stationOrder - activeBus.passengerCount) * timePerStation;
    
    const eta = new Date(currentTime);
    eta.setMinutes(eta.getMinutes() + timeDifference);
    
    return formatTime(eta);
  };

  // Handle station selection
  const handleSelectStation = (station) => {
    setSelectedStationId(station.id);
    setSelectedStation(station);
  };

  // Handle continue to next step
  const handleContinue = () => {
    if (selectedStationId) {
      navigate('/dashboard/bus-availability');
    }
  };

  // Handle go back to route selection
  const handleGoBack = () => {
    navigate('/dashboard/choose-route');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Select Your Station</h1>
            <p className="text-gray-600">
              Choose a boarding station on the {selectedRoute?.name || 'selected route'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-4">
        {/* Route Information Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-bold mb-1">{selectedRoute?.name}</h2>
              <p className="opacity-90">{selectedRoute?.from} → {selectedRoute?.to}</p>
            </div>
            <div className="mt-3 md:mt-0 bg-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
        
        {/* Active Bus Information */}
        {activeBus && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Bus className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800">Bus Nearby</h3>
                <p className="text-yellow-700 text-sm">
                  Bus {activeBus.plateNumber} is currently at {activeBus.currentStation}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Station List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="border-b border-gray-200 p-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">
              Stations on this route
            </h2>
            <p className="text-sm text-gray-600">
              {routeStations.length} stops • Tap to select boarding station
            </p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {routeStations.map((station) => {
              const isSelected = selectedStationId === station.id;
              const isStart = station.order === 1;
              const isEnd = station.order === routeStations.length;
              
              return (
                <div 
                  key={station.id}
                  className={`p-4 transition-all duration-200 ${
                    isSelected 
                      ? 'bg-blue-50 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50 cursor-pointer'
                  }`}
                  onClick={() => handleSelectStation(station)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-blue-500' : 'bg-gray-200'
                      }`}>
                        <MapPin 
                          size={20} 
                          className={isSelected ? 'text-white' : 'text-gray-600'} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${
                          isSelected ? 'text-blue-700' : 'text-gray-800'
                        }`}>
                          {station.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          Stop #{station.order}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {isStart && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            Start Point
                          </span>
                        )}
                        {isEnd && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                            End Point
                          </span>
                        )}
                        {activeBus && activeBus.currentStation === station.name && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium flex items-center">
                            <Bus size={12} className="mr-1" />
                            Bus here now
                          </span>
                        )}
                      </div>
                      
                      {activeBus && activeBus.routeId === selectedRoute.id && (
                        <div className="mt-3 flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-1" />
                          <span>
                            Next bus arrival: {calculateETA(station.order)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      <ChevronRight 
                        size={20} 
                        className={isSelected ? 'text-blue-500' : 'text-gray-400'} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Station Map Preview */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Route Map Preview</h2>
          
          <div className="relative h-40 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-200 overflow-hidden">
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
                  <div className={`w-5 h-5 rounded-full ${
                    selectedStationId === station.id 
                      ? 'bg-blue-600 border-2 border-white shadow-lg' 
                      : 'bg-white border-2 border-blue-600'
                  }`}></div>
                  {selectedStationId === station.id && (
                    <div className="absolute top-full mt-1 text-xs font-medium text-blue-700 text-center max-w-[80px] truncate">
                      {station.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Active Bus */}
            {activeBus && (
              <div 
                className="absolute top-1/2 animate-pulse"
                style={{ 
                  left: `${(activeBus.passengerCount) * 20}%`,
                  transform: 'translate(-50%, -50%)' 
                }}
              >
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Bus className="text-white" size={16} />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-center space-x-4">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-blue-600 border-2 border-white rounded-full mr-1"></div>
              <span>Station</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span>Bus</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Routes
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedStationId}
            className={`px-6 py-3 rounded-lg flex items-center transition-colors ${
              selectedStationId
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            View Bus Availability
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationSelector;