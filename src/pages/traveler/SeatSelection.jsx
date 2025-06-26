import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight , User, Armchair, X, Check, 
  Luggage, Info, UserPlus, UserMinus 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const SeatSelection = () => {
  const navigate = useNavigate();
  const { selectedBus, setBookingData } = useAppContext();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState(1);
  const [luggageCount, setLuggageCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  
  // Initialize seats when bus is selected
  useEffect(() => {
    if (!selectedBus) {
      navigate('/dashboard/bus-availability');
      return;
    }
    
    // Generate seats array
    const generatedSeats = [];
    const totalSeats = selectedBus.totalSeats;
    const bookedSeats = selectedBus.bookedSeats;
    
    for (let i = 1; i <= totalSeats; i++) {
      generatedSeats.push({
        id: i,
        status: i <= bookedSeats ? 'booked' : 'available',
        type: i <= 4 ? 'premium' : 'standard'
      });
    }
    
    setSeats(generatedSeats);
  }, [selectedBus, navigate]);
  
  // Calculate total price
  useEffect(() => {
    const seatPrice = selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + (seat?.type === 'premium' ? 5000 : 1000);
    }, 0);
    
    const luggageFee = luggageCount * 500;
    setTotalPrice(seatPrice + luggageFee);
  }, [selectedSeats, luggageCount, seats]);
  
  // Handle seat selection
  const handleSeatSelect = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    
    // Can't select booked seats
    if (seat.status === 'booked') return;
    
    // Toggle seat selection
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Limit selection to number of passengers
      if (selectedSeats.length < passengers) {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };
  
  // Handle passenger count change
  const handlePassengerChange = (count) => {
    if (count < 1) return;
    if (count > 8) return;
    
    setPassengers(count);
    
    // If reducing passengers, remove extra selected seats
    if (count < selectedSeats.length) {
      setSelectedSeats(selectedSeats.slice(0, count));
    }
  };
  
  // Handle luggage count change
  const handleLuggageChange = (count) => {
    if (count < 0) return;
    if (count > 4) return;
    setLuggageCount(count);
  };
  
  // Handle continue to booking
  const handleContinue = () => {
    if (selectedSeats.length === passengers) {
      setBookingData({
        bus: selectedBus,
        selectedSeats,
        passengers,
        luggageCount,
        totalPrice
      });
      navigate('/dashboard/ticket-booking');
    }
  };
  
  // Handle go back
  const handleGoBack = () => {
    navigate('/dashboard/bus-availability');
  };
  
  // Render seat status indicator
  const renderSeatStatusIndicator = () => (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-green-500 rounded-md mr-2"></div>
        <span className="text-sm">Available</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 bg-blue-500 rounded-md mr-2"></div>
        <span className="text-sm">Selected</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 bg-red-500 rounded-md mr-2"></div>
        <span className="text-sm">Booked</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 bg-purple-500 rounded-md mr-2"></div>
        <span className="text-sm">Premium</span>
      </div>
    </div>
  );

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
            <h1 className="text-2xl font-bold text-gray-800">Select Your Seats</h1>
            <p className="text-gray-600">
              Bus {selectedBus?.plateNumber || 'selected bus'}
            </p>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="ml-auto p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Info size={20} />
          </button>
        </div>
      </div>
      
      {/* Information Panel */}
      {showInfo && (
        <div className="bg-blue-50 border-b border-blue-200 py-3 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Info size={18} className="text-blue-600" />
              </div>
              <div className="ml-3 text-blue-700 text-sm">
                <p>• Premium seats (front row) cost TZS 5,000</p>
                <p>• Standard seats cost TZS 3,000</p>
                <p>• Each luggage item costs TZS 1,000 (max 4 items)</p>
                <p>• Select seats for all passengers before proceeding</p>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="ml-auto text-blue-600 hover:text-blue-800"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Bus Information */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                Bus {selectedBus?.plateNumber}
              </h2>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Armchair size={16} className="mr-1" />
                <span>
                  {selectedBus?.totalSeats - selectedBus?.bookedSeats} seats available • 
                  <span className="text-green-600 font-medium ml-1">
                    {selectedBus?.totalSeats - selectedBus?.bookedSeats > 10 ? 'Good availability' : 'Limited availability'}
                  </span>
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Departing from {selectedBus?.currentStation} at {selectedBus?.estimatedArrival}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-800">Selected Seats</div>
                <div className="font-bold text-xl text-center">
                  {selectedSeats.length} / {passengers}
                </div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-purple-800">Total Price</div>
                <div className="font-bold text-xl text-center">
                  TZS {totalPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Passenger and Luggage Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <User size={18} className="mr-2" />
              Passengers
            </h3>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePassengerChange(passengers - 1)}
                disabled={passengers <= 1}
                className={`p-2 rounded-full ${
                  passengers <= 1 ? 'bg-gray-100 text-gray-400' : 'bg-red-100 text-red-600 hover:bg-red-200'
                }`}
              >
                <UserMinus size={20} />
              </button>
              
              <div className="text-center">
                <div className="text-3xl font-bold">{passengers}</div>
                <div className="text-sm text-gray-600">Travelers</div>
              </div>
              
              <button
                onClick={() => handlePassengerChange(passengers + 1)}
                disabled={passengers >= 8}
                className={`p-2 rounded-full ${
                  passengers >= 8 ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                <UserPlus size={20} />
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Luggage size={18} className="mr-2" />
              Luggage
            </h3>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleLuggageChange(luggageCount - 1)}
                disabled={luggageCount <= 0}
                className={`p-2 rounded-full ${
                  luggageCount <= 0 ? 'bg-gray-100 text-gray-400' : 'bg-red-100 text-red-600 hover:bg-red-200'
                }`}
              >
                <UserMinus size={20} />
              </button>
              
              <div className="text-center">
                <div className="text-3xl font-bold">{luggageCount}</div>
                <div className="text-sm text-gray-600">Items (TZS 500 each)</div>
              </div>
              
              <button
                onClick={() => handleLuggageChange(luggageCount + 1)}
                disabled={luggageCount >= 4}
                className={`p-2 rounded-full ${
                  luggageCount >= 4 ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                <UserPlus size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Seat Status Indicator */}
        {renderSeatStatusIndicator()}
        
        {/* Bus Visualization */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex justify-center mb-4">
            <div className="w-32 h-4 bg-gray-700 rounded-full"></div>
          </div>
          
          {/* Driver Area */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm">
              Driver
            </div>
          </div>
          
          {/* Seat Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {seats.map(seat => (
              <div 
                key={seat.id}
                onClick={() => handleSeatSelect(seat.id)}
                className={`
                  relative flex items-center justify-center rounded-lg cursor-pointer transition-all
                  ${seat.status === 'booked' 
                    ? 'bg-red-500 text-white cursor-not-allowed' 
                    : selectedSeats.includes(seat.id)
                      ? 'bg-blue-500 text-white'
                      : seat.type === 'premium'
                        ? 'bg-purple-500 text-white'
                        : 'bg-green-500 text-white hover:bg-green-600'}
                  ${seat.id <= 4 ? 'h-16' : 'h-12'}
                `}
              >
                <div className="flex flex-col items-center">
                  <Armchair size={seat.id <= 4 ? 24 : 20} />
                  <span className="text-xs mt-1 font-medium">Seat {seat.id}</span>
                </div>
                
                {seat.status === 'booked' && (
                  <div className="absolute top-0 right-0 bg-red-700 text-white text-xs px-1 rounded-bl-lg">
                    Booked
                  </div>
                )}
                
                {selectedSeats.includes(seat.id) && (
                  <div className="absolute top-0 right-0 bg-blue-700 text-white p-1 rounded-bl-lg">
                    <Check size={14} />
                  </div>
                )}
                
                {seat.type === 'premium' && seat.status !== 'booked' && !selectedSeats.includes(seat.id) && (
                  <div className="absolute top-0 right-0 bg-purple-700 text-white text-xs px-1 rounded-bl-lg">
                    Premium
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Exit Area */}
          <div className="flex justify-center mt-8">
            <div className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm">
              Exit
            </div>
          </div>
        </div>
        
        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Your Selected Seats</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seatId => {
                const seat = seats.find(s => s.id === seatId);
                return (
                  <div 
                    key={seatId} 
                    className={`px-4 py-2 rounded-lg font-medium ${
                      seat?.type === 'premium' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    }`}
                  >
                    Seat {seatId} {seat?.type === 'premium' ? '(Premium)' : ''}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Price Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Price Breakdown</h3>
          <div className="space-y-2">
            {selectedSeats.map(seatId => {
              const seat = seats.find(s => s.id === seatId);
              const price = seat?.type === 'premium' ? 5000 :1000;
              return (
                <div key={seatId} className="flex justify-between">
                  <div className="text-gray-600">
                    Seat {seatId} {seat?.type === 'premium' ? '(Premium)' : ''}
                  </div>
                  <div>TZS {price.toLocaleString()}</div>
                </div>
              );
            })}
            
            {luggageCount > 0 && (
              <div className="flex justify-between">
                <div className="text-gray-600">
                  Luggage ({luggageCount} items)
                </div>
                <div>TZS {(luggageCount * 500).toLocaleString()}</div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <div>Total:</div>
                <div>TZS {totalPrice.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-4">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Buses
          </button>
          
          <button
            onClick={handleContinue}
            disabled={selectedSeats.length !== passengers}
            className={`px-6 py-3 rounded-lg flex items-center transition-colors ${
              selectedSeats.length === passengers
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Proceed to Booking
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;