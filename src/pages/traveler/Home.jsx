// src/pages/traveler/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Bus, MapPin, Ticket, CreditCard } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome Traveler!</h2>
        <p className="text-gray-600 mb-6">
          This is your dashboard. Select an option to start your journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Ticket Card */}
          <div 
            onClick={() => navigate('/dashboard/choose-route')}
            className="border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Ticket className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">Book New Ticket</h3>
            </div>
            <p className="text-gray-500 mb-4">
              Select a route, bus, and seat to book your journey
            </p>
            <div className="flex items-center text-blue-600 font-medium">
              <span>Start Booking</span>
              <ChevronRight size={20} />
            </div>
          </div>

          {/* View Routes Card */}
          <div 
            onClick={() => navigate('/dashboard/route-map')}
            className="border border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <MapPin className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">View Routes Map</h3>
            </div>
            <p className="text-gray-500 mb-4">
              Explore available bus routes and stations
            </p>
            <div className="flex items-center text-green-600 font-medium">
              <span>View Map</span>
              <ChevronRight size={20} />
            </div>
          </div>

          {/* My Tickets Card */}
          <div 
            onClick={() => navigate('/dashboard/receipt')}
            className="border border-gray-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <CreditCard className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">My Tickets</h3>
            </div>
            <p className="text-gray-500 mb-4">
              View and manage your booked tickets
            </p>
            <div className="flex items-center text-purple-600 font-medium">
              <span>View Tickets</span>
              <ChevronRight size={20} />
            </div>
          </div>

          {/* Bus Availability Card */}
          <div 
            onClick={() => navigate('/dashboard/bus-availability')}
            className="border border-gray-200 rounded-xl p-6 hover:border-yellow-500 hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <Bus className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold">Bus Availability</h3>
            </div>
            <p className="text-gray-500 mb-4">
              Check real-time bus locations and schedules
            </p>
            <div className="flex items-center text-yellow-600 font-medium">
              <span>Check Buses</span>
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Mji to Suza</h4>
              <p className="text-sm text-gray-500">Today, 14:30 • 2 seats</p>
            </div>
            <div className="text-green-600 font-semibold">TSh 10,000</div>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Suza to Mji</h4>
              <p className="text-sm text-gray-500">Yesterday, 10:15 • 1 seat</p>
            </div>
            <div className="text-green-600 font-semibold">TSh 5,000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;