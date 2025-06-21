import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, Clock, MapPin, Users, ChevronLeft, 
  ChevronRight, ArrowDown, ArrowUp, Filter, RefreshCw 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { buses, stations } from '../../data/mockData';

const BusAvailability = () => {
  const navigate = useNavigate();
  const { selectedRoute, selectedStation, setSelectedBus } = useAppContext();
  const [availableBuses, setAvailableBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [sortOption, setSortOption] = useState('eta');
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minSeats: 1,
    maxPrice: 10000,
    busTypes: ['standard', 'express'],
    status: ['active', 'arriving']
  });
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Calculate ETA minutes based on estimatedArrival time
  const calculateEtaMinutes = (estimatedArrival) => {
    const [hours, minutes] = estimatedArrival.split(':').map(Number);
    const arrivalTime = new Date();
    arrivalTime.setHours(hours, minutes, 0, 0);
    
    const diffMs = arrivalTime - currentTime;
    return Math.max(0, Math.floor(diffMs / 60000));
  };
  
  // Calculate station order for a bus
  const getBusStationOrder = (bus) => {
    const station = stations.find(s => 
      s.routeId === bus.routeId && s.name === bus.currentStation
    );
    return station ? station.order : 0;
  };

  // Simulate fetching bus data
  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      // Enhance buses with calculated properties
      const enhancedBuses = buses.map(bus => {
        const stationOrder = getBusStationOrder(bus);
        return {
          ...bus,
          currentStationOrder: stationOrder,
          etaMinutes: calculateEtaMinutes(bus.estimatedArrival),
          fare: 5000, // Default fare
          type: 'standard' // Default type
        };
      });
      
      // Filter buses for the selected route and station proximity
      let result = enhancedBuses.filter(bus => 
        bus.routeId === selectedRoute?.id
      );
      
      // Proximity filter
      if (selectedStation) {
        result = result.filter(bus => {
          return Math.abs(bus.currentStationOrder - selectedStation.order) <= 2;
        });
      }
      
      setAvailableBuses(result);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedRoute, selectedStation, currentTime]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...availableBuses];
    
    // Apply filters
    result = result.filter(bus => 
      (bus.totalSeats - bus.bookedSeats) >= filters.minSeats &&
      bus.fare <= filters.maxPrice &&
      filters.busTypes.includes(bus.type) &&
      filters.status.includes(bus.status)
    );
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch(sortOption) {
        case 'eta':
          comparison = a.etaMinutes - b.etaMinutes;
          break;
        case 'seats':
          comparison = (a.totalSeats - a.bookedSeats) - (b.totalSeats - b.bookedSeats);
          break;
        case 'price':
          comparison = a.fare - b.fare;
          break;
        default:
          comparison = a.etaMinutes - b.etaMinutes;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredBuses(result);
  }, [availableBuses, sortOption, sortDirection, filters]);
  
  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSort = (option) => {
    if (sortOption === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortDirection('asc');
    }
  };
  
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const toggleBusType = (type) => {
    setFilters(prev => {
      const newTypes = prev.busTypes.includes(type)
        ? prev.busTypes.filter(t => t !== type)
        : [...prev.busTypes, type];
      
      return { ...prev, busTypes: newTypes };
    });
  };
  
  const toggleStatus = (status) => {
    setFilters(prev => {
      const newStatus = prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status];
      
      return { ...prev, status: newStatus };
    });
  };
  
  const refreshBuses = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  
  const getBusTypeLabel = (type) => {
    switch(type) {
      case 'standard': return 'Standard';
      case 'express': return 'Express';
      case 'premium': return 'Premium';
      default: return type;
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'arriving': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Render bus availability status
  const renderAvailabilityStatus = (bus) => {
    const availableSeats = bus.totalSeats - bus.bookedSeats;
    
    if (availableSeats === 0) {
      return (
        <div className="text-red-600 font-medium">Fully Booked</div>
      );
    } else if (availableSeats <= 5) {
      return (
        <div className="text-orange-600 font-medium">
          Only {availableSeats} seat{availableSeats > 1 ? 's' : ''} left
        </div>
      );
    } else {
      return (
        <div className="text-green-600 font-medium">
          {availableSeats} seats available
        </div>
      );
    }
  };
  
  // Render bus occupancy indicator
  const renderOccupancyBar = (bus) => {
    const percentage = (bus.bookedSeats / bus.totalSeats) * 100;
    
    let colorClass = 'bg-green-500';
    if (percentage > 75) {
      colorClass = 'bg-red-500';
    } else if (percentage > 50) {
      colorClass = 'bg-orange-500';
    } else if (percentage > 25) {
      colorClass = 'bg-yellow-500';
    }
    
    return (
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };
  
  // Handle bus selection
  const handleSelectBus = (bus) => {
    setSelectedBusId(bus.id);
    setSelectedBus(bus);
  };
  
  // Handle continue to seat selection
  const handleContinue = () => {
    if (selectedBusId) {
      navigate('/dashboard/seat-selection');
    }
  };
  
  // Handle go back to station selection
  const handleGoBack = () => {
    navigate('/dashboard/stations');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Available Buses</h1>
            <p className="text-gray-600">
              Boarding at {selectedStation?.name || 'selected station'}
            </p>
          </div>
          <button
            onClick={refreshBuses}
            className="ml-auto p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
      
      {/* Route Information */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white mb-6 shadow-lg">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">{selectedRoute?.name}</h2>
              <p className="opacity-90 flex items-center">
                <MapPin size={16} className="mr-1" />
                {selectedStation?.name}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="text-sm">
                {filteredBuses.length} bus{filteredBuses.length !== 1 ? 'es' : ''} available
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleSort('eta')}
                  className={`px-3 py-1 rounded-full flex items-center text-sm ${
                    sortOption === 'eta' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>ETA</span>
                  {sortOption === 'eta' && (
                    sortDirection === 'asc' 
                      ? <ArrowUp size={16} className="ml-1" /> 
                      : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
                <button 
                  onClick={() => handleSort('seats')}
                  className={`px-3 py-1 rounded-full flex items-center text-sm ${
                    sortOption === 'seats' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>Seats</span>
                  {sortOption === 'seats' && (
                    sortDirection === 'asc' 
                      ? <ArrowUp size={16} className="ml-1" /> 
                      : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
                <button 
                  onClick={() => handleSort('price')}
                  className={`px-3 py-1 rounded-full flex items-center text-sm ${
                    sortOption === 'price' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>Price</span>
                  {sortOption === 'price' && (
                    sortDirection === 'asc' 
                      ? <ArrowUp size={16} className="ml-1" /> 
                      : <ArrowDown size={16} className="ml-1" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className={`px-3 py-1 rounded-full flex items-center text-sm ${
                  filterOpen 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter size={16} className="mr-1" />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {/* Filter Panel */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Available Seats</h3>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">Min:</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={filters.minSeats}
                      onChange={(e) => handleFilterChange('minSeats', parseInt(e.target.value))}
                      className="w-full max-w-xs"
                    />
                    <span className="ml-2 w-10 text-center bg-gray-100 rounded py-1 text-sm">
                      {filters.minSeats}+
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Max Price (TSh)</h3>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">Up to:</span>
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="500"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                      className="w-full max-w-xs"
                    />
                    <span className="ml-2 w-16 text-center bg-gray-100 rounded py-1 text-sm">
                      {filters.maxPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Bus Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {['standard', 'express', 'premium'].map(type => (
                      <button
                        key={type}
                        onClick={() => toggleBusType(type)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.busTypes.includes(type)
                            ? 'bg-blue-100 text-blue-600 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {getBusTypeLabel(type)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['active', 'arriving', 'delayed'].map(status => (
                      <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        className={`px-3 py-1 rounded-full text-sm capitalize ${
                          filters.status.includes(status)
                            ? `${getStatusColor(status)} border`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && filteredBuses.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mx-auto bg-gray-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <Bus className="text-gray-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No buses available</h3>
            <p className="text-gray-600 mb-6">
              There are currently no buses matching your criteria at this station.
            </p>
            <button
              onClick={() => {
                setFilters({
                  minSeats: 1,
                  maxPrice: 10000,
                  busTypes: ['standard', 'express', 'premium'],
                  status: ['active', 'arriving', 'delayed']
                });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Bus List */}
        {!loading && filteredBuses.length > 0 && (
          <div className="space-y-4 mb-8">
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedBusId === bus.id
                    ? 'border-blue-500 shadow-blue-100'
                    : 'border-white hover:border-blue-300 hover:shadow-md'
                }`}
                onClick={() => handleSelectBus(bus)}
              >
                <div className="p-5">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Bus size={20} className="text-blue-600 mr-2" />
                        <h3 className="text-lg font-bold text-gray-800">{bus.plateNumber}</h3>
                        <span className={`ml-3 px-2 py-1 rounded text-xs font-medium ${getStatusColor(bus.status)}`}>
                          {bus.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <MapPin size={14} className="mr-1" />
                        <span>Currently at: {bus.currentStation}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={14} className="mr-1" />
                        <span>
                          Arrival: {bus.etaMinutes} min
                          <span className="ml-2 bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            ~{bus.estimatedArrival}
                          </span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800 mb-1">
                        TZS {bus.fare.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Per passenger</div>
                      <div className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800 mt-1">
                        {getBusTypeLabel(bus.type)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-gray-600 flex items-center">
                        <Users size={14} className="mr-1" />
                        <span>
                          {bus.bookedSeats}/{bus.totalSeats} seats booked
                        </span>
                      </div>
                      {renderAvailabilityStatus(bus)}
                    </div>
                    {renderOccupancyBar(bus)}
                  </div>
                </div>
                
                <div className={`bg-gray-50 px-5 py-3 flex justify-between items-center ${
                  selectedBusId === bus.id ? 'bg-blue-50' : ''
                }`}>
                  <div className="text-sm text-gray-600">
                    {selectedBusId === bus.id ? (
                      <span className="text-blue-600 font-medium flex items-center">
                        Selected for booking
                      </span>
                    ) : (
                      "Click to select this bus"
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    Bus ID: {bus.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Summary */}
        {!loading && filteredBuses.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">Earliest Arrival</p>
                <p className="font-semibold text-lg">
                  {Math.min(...filteredBuses.map(b => b.etaMinutes))} min
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">Most Seats</p>
                <p className="font-semibold text-lg">
                  {Math.max(...filteredBuses.map(b => b.totalSeats - b.bookedSeats))}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">Lowest Price</p>
                <p className="font-semibold text-lg">
                  TSh {Math.min(...filteredBuses.map(b => b.fare)).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-800">Express Buses</p>
                <p className="font-semibold text-lg">
                  {filteredBuses.filter(b => b.type === 'express').length}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-4">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Stations
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedBusId}
            className={`px-6 py-3 rounded-lg flex items-center transition-colors ${
              selectedBusId
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Seat Selection
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
        
        {/* Information Section */}
        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <Bus size={20} className="mr-2" />
            About Bus Availability
          </h3>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Buses are listed based on their estimated arrival time at your selected station</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Availability updates in real-time as other travelers book seats</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Prices may vary based on time of day and demand</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Seat selection will be available after choosing a bus</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusAvailability;