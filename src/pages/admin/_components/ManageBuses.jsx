import React from 'react';
import { Gauge, Users, MapPin, Map } from 'lucide-react';

const ManageBuses = ({ 
  buses = [], 
  routes = [], 
  stations = [] 
}) => {
  if (!buses || buses.length === 0) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              No buses available. Please add buses to the system.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => {
          const route = routes.find((r) => r.id === bus.routeId);
          const currentStation = stations.find(
            (s) => s.name === bus.currentStation
          );

          return (
            <div
              key={bus.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">
                    {bus.plateNumber}
                  </h3>
                  <p className="text-gray-600">
                    {route ? route.name : "Unknown Route"}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                    bus.status === "active"
                      ? "bg-green-100 text-green-800"
                      : bus.status === "maintenance"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {bus.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Gauge className="text-gray-500 mr-2" size={18} />
                  <span>
                    Capacity: <strong>{bus.totalSeats}</strong> seats
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="text-gray-500 mr-2" size={18} />
                  <span>
                    Passengers: <strong>{bus.passengerCount}</strong>/
                    <strong>{bus.totalSeats}</strong> (
                    {Math.round((bus.passengerCount / bus.totalSeats) * 100)}%)
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-gray-500 mr-2" size={18} />
                  <div>
                    <p>
                      Current Station: <strong>{bus.currentStation || "Unknown"}</strong>
                    </p>
                    {currentStation && currentStation.location ? (
                      <p className="text-xs text-gray-500 mt-1">
                        Lat: {currentStation.location.latitude.toFixed(5)}, Lng:{" "}
                        {currentStation.location.longitude.toFixed(5)}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">
                        Location data unavailable
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <Map className="text-gray-500 mr-2" size={18} />
                  <span>
                    Arrival: <strong>{bus.estimatedArrival || "N/A"}</strong>
                  </span>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageBuses;