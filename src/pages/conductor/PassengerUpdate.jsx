import React, { useState } from 'react';

const PassengerUpdate = () => {
  const [passengerCount, setPassengerCount] = useState(35);
  const [manualCount, setManualCount] = useState(35);

  const updatePassengerCount = (type, value) => {
    if (type === 'manual') {
      setPassengerCount(value);
      setManualCount(value);
    } else if (type === 'add') {
      const newCount = Math.min(50, passengerCount + 1);
      setPassengerCount(newCount);
      setManualCount(newCount);
    } else if (type === 'subtract') {
      const newCount = Math.max(0, passengerCount - 1);
      setPassengerCount(newCount);
      setManualCount(newCount);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-3">Update Passenger Count</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Manual Update</h4>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              max="50"
              value={manualCount}
              onChange={(e) => setManualCount(parseInt(e.target.value) || 0)}
              className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => updatePassengerCount('manual', manualCount)}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updatePassengerCount('subtract')}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              -1
            </button>
            <span className="px-3 py-2 bg-white border rounded font-semibold">
              {passengerCount}
            </span>
            <button
              onClick={() => updatePassengerCount('add')}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              +1
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-3 p-3 bg-white rounded border">
        <p className="text-sm text-gray-600">
          Current: <span className="font-semibold">{passengerCount} passengers</span>
          {' | '}
          Available: <span className="font-semibold">{50 - passengerCount} seats</span>
        </p>
      </div>
    </div>
  );
};

export default PassengerUpdate;
