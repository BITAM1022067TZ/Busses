import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

// Receive props as a single object and destructure
const ManageRoute = ({ 
  getStationsForRoute, 
  setSelectedRoute, 
  setActiveTab, 
  routes 
}) => {
  if (!routes || routes.length === 0) {
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
              No routes available. Please add routes first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => {
          const routeStations = getStationsForRoute(route.id);
          return (
            <div
              key={route.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedRoute(route);
                setActiveTab("stations");
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {route.name}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {routeStations.length} stations
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <ArrowRightLeft className="text-gray-500" size={18} />
                <div>
                  <p className="text-sm text-gray-600">
                    {route.from} → {route.to}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-medium text-gray-700 mb-2">
                  Key Stations:
                </h4>
                <div className="space-y-1">
                  {routeStations.slice(0, 3).map((station) => (
                    <div key={station.id} className="flex items-center text-sm">
                      <span className="w-5 h-5 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-xs mr-2">
                        {station.order}
                      </span>
                      {station.name}
                    </div>
                  ))}
                  {routeStations.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{routeStations.length - 3} more stations
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageRoute;