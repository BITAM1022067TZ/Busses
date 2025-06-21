import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { MapPin, Bus, ChevronLeft, Navigation, Clock, Users } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { routes, stations, buses } from '../../data/mockData';

// Fix for Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RouteMap = () => {
  const { selectedRoute, setSelectedRoute } = useAppContext();
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeBus, setActiveBus] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapCenter, setMapCenter] = useState([-6.8167, 39.2833]); // Default to Dar es Salaam
  const [zoomLevel, setZoomLevel] = useState(13);
  const mapRef = useRef(null);
  
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
      
      // Center map on the active bus
      if (randomBus.currentLocation) {
        setMapCenter([randomBus.currentLocation.lat, randomBus.currentLocation.lng]);
      }
    }
  }, []);
  
  // Get stations for the active route
  const routeStations = activeRoute 
    ? stations
        .filter(s => s.routeId === activeRoute.id)
        .sort((a, b) => a.order - b.order)
        .map(station => {
          // Generate mock coordinates based on station order
          return {
            ...station,
            position: [
              -6.8167 + (0.01 * station.order),
              39.2833 - (0.01 * station.order)
            ]
          };
        })
    : [];
  
  // Generate polyline for the route
  const routePolyline = routeStations.map(station => station.position);
  
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
  
  // Custom bus icon
  const busIcon = L.divIcon({
    className: 'bus-marker',
    html: `<div class="bus-icon"><Bus size="24" /></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

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
            <h1 className="text-2xl font-bold text-gray-800">Route Map</h1>
            <p className="text-gray-600">View bus routes and real-time locations</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-4">
        {/* Route Selector */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Select Route</h2>
          <div className="flex flex-wrap gap-2">
            {routes.map(route => (
              <button
                key={route.id}
                onClick={() => setActiveRoute(route)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeRoute?.id === route.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {route.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Map Container */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {activeRoute ? activeRoute.name : 'Route Map'}
            </h2>
            <div className="text-sm text-gray-500">
              Updated: {formatTime(currentTime)}
            </div>
          </div>
          
          {/* Leaflet Map */}
          <div className="h-96 rounded-lg overflow-hidden">
            <MapContainer 
              center={mapCenter} 
              zoom={zoomLevel} 
              style={{ height: '100%', width: '100%' }}
              whenCreated={mapInstance => { mapRef.current = mapInstance }}
              className="rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Route Polyline */}
              {routePolyline.length > 1 && (
                <Polyline 
                  positions={routePolyline} 
                  color="#2563eb" 
                  weight={4}
                  opacity={0.8}
                />
              )}
              
              {/* Stations */}
              {routeStations.map((station) => (
                <Marker 
                  key={station.id} 
                  position={station.position}
                  icon={L.icon({
                    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                  })}
                >
                  <Popup>
                    <div className="font-medium">{station.name}</div>
                    <div className="text-sm text-gray-600">Station {station.order}</div>
                    {activeBus && (
                      <div className="mt-1 text-xs text-blue-600">
                        Bus ETA: {calculateETA(station.order)}
                      </div>
                    )}
                  </Popup>
                </Marker>
              ))}
              
              {/* Active Bus */}
              {activeBus && activeBus.currentLocation && (
                <Marker 
                  position={[activeBus.currentLocation.lat, activeBus.currentLocation.lng]}
                  icon={busIcon}
                >
                  <Popup>
                    <div className="font-bold">{activeBus.plateNumber}</div>
                    <div className="text-sm">
                      <div>Route: {activeRoute?.name}</div>
                      <div>Status: <span className="text-green-600">Active</span></div>
                      <div>Passengers: {activeBus.passengerCount}/{activeBus.totalSeats}</div>
                      <div>Next Station: {activeBus.currentStation}</div>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
              <span className="text-sm">Route</span>
            </div>
            <div className="flex items-center">
              <img 
                src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" 
                alt="Station" 
                className="w-4 h-6 mr-1"
              />
              <span className="text-sm">Station</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-1">
                <Bus size={14} className="text-white" />
              </div>
              <span className="text-sm">Active Bus</span>
            </div>
          </div>
        </div>
        
        {/* Route Information */}
        {activeRoute && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Route Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 flex items-center mb-2">
                  <Navigation className="mr-2" size={18} />
                  Route Details
                </h3>
                <p className="text-blue-600">
                  <span className="font-medium">From:</span> {activeRoute.from}
                </p>
                <p className="text-blue-600">
                  <span className="font-medium">To:</span> {activeRoute.to}
                </p>
                <p className="text-blue-600">
                  <span className="font-medium">Stations:</span> {routeStations.length}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 flex items-center mb-2">
                  <Clock className="mr-2" size={18} />
                  Estimated Travel Time
                </h3>
                <p className="text-green-600">
                  <span className="font-medium">Full Route:</span> 45-60 minutes
                </p>
                <p className="text-green-600">
                  <span className="font-medium">Per Station:</span> 10-15 minutes
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Bus Information */}
        {activeBus && (
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Active Bus Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 flex items-center mb-2">
                  <Bus className="mr-2" size={18} />
                  Bus Details
                </h3>
                <p className="text-purple-600">
                  <span className="font-medium">Plate:</span> {activeBus.plateNumber}
                </p>
                <p className="text-purple-600">
                  <span className="font-medium">Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded text-xs ${
                    activeBus.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {activeBus.status}
                  </span>
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 flex items-center mb-2">
                  <Users className="mr-2" size={18} />
                  Passenger Info
                </h3>
                <p className="text-yellow-600">
                  <span className="font-medium">Capacity:</span> {activeBus.totalSeats}
                </p>
                <p className="text-yellow-600">
                  <span className="font-medium">Occupancy:</span> 
                  <span className="font-semibold ml-1">
                    {activeBus.passengerCount}/{activeBus.totalSeats}
                  </span>
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 flex items-center mb-2">
                  <MapPin className="mr-2" size={18} />
                  Next Station
                </h3>
                {routeStations.length > 0 && activeBus.passengerCount < routeStations.length && (
                  <>
                    <p className="text-blue-600">
                      <span className="font-medium">Station:</span> {routeStations[activeBus.passengerCount]?.name}
                    </p>
                    <p className="text-blue-600">
                      <span className="font-medium">ETA:</span> {calculateETA(activeBus.passengerCount + 1)}
                    </p>
                  </>
                )}
                {routeStations.length > 0 && activeBus.passengerCount >= routeStations.length && (
                  <p className="text-blue-600 font-medium">Completed route</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom styles for the bus marker */}
      <style jsx="true">{`
        .bus-marker {
          background: transparent;
          border: none;
        }
        .bus-icon {
          width: 32px;
          height: 32px;
          background: #f59e0b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 1.5s infinite;
          box-shadow: 0 0 0 rgba(245, 158, 11, 0.4);
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default RouteMap;