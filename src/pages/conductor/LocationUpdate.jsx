import React, { useState } from 'react';

const LocationUpdate = ({ currentLocation, setCurrentLocation }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateLocation = () => {
    setIsUpdating(true);
    setTimeout(() => {
      const locations = ['Tobo la pili', 'Posta', 'Suza '];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setCurrentLocation(randomLocation);
      setIsUpdating(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-3">Update Bus Location</h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600">Current Location:</p>
          <p className="font-semibold text-lg">{currentLocation}</p>
        </div>
        <button
          onClick={updateLocation}
          disabled={isUpdating}
          className={`px-4 py-2 rounded-lg font-semibold ${
            isUpdating 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Update Location'}
        </button>
      </div>
    </div>
  );
};

export default LocationUpdate;
