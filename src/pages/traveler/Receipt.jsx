import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Download, Printer, Map, Share2, 
  CheckCircle, Bus, MapPin, Calendar, Clock, User, Armchair, Luggage
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Receipt = () => {
  const navigate = useNavigate();
  const { bookingData } = useAppContext();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Mock ticket data
  const ticketData = {
    ticketNumber: `TKT-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
    issueDate: new Date().toLocaleDateString(),
    issueTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    departureDate: new Date().toLocaleDateString(),
    departureTime: bookingData?.bus?.estimatedArrival || '14:30',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() // 30 days from now
  };
  
  // Handle download
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('Your ticket has been downloaded!');
    }, 1500);
  };
  
  // Handle share
  const handleShare = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      alert('Ticket shared successfully!');
    }, 1000);
  };
  
  // Handle print
  const handlePrint = () => {
    window.print();
  };
  
  // Handle view map
  const handleViewMap = () => {
    navigate('/dashboard/route-map');
  };
  
  // Handle new booking
  const handleNewBooking = () => {
    navigate('/dashboard/choose-route');
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Header - Hidden when printing */}
      <div className="bg-white shadow-sm border-b print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-800">Booking Confirmed</h1>
            <p className="text-gray-600">Your ticket and receipt details</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Confirmation Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white mb-6 text-center">
          <CheckCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-lg opacity-90">
            Thank you for choosing DiraBasi. Your tickets are ready.
          </p>
        </div>
        
        {/* Action Buttons - Hidden when printing */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 print:hidden">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`px-4 py-3 rounded-lg flex items-center ${
              isDownloading
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Download size={20} className="mr-2" />
            {isDownloading ? 'Downloading...' : 'Download Ticket'}
          </button>
          
          <button
            onClick={handlePrint}
            className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
          >
            <Printer size={20} className="mr-2" />
            Print Ticket
          </button>
          
          <button
            onClick={handleShare}
            disabled={isSharing}
            className={`px-4 py-3 rounded-lg flex items-center ${
              isSharing
                ? 'bg-purple-400 text-white cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <Share2 size={20} className="mr-2" />
            {isSharing ? 'Sharing...' : 'Share Ticket'}
          </button>
          
          <button
            onClick={handleViewMap}
            className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <Map size={20} className="mr-2" />
            View Route Map
          </button>
        </div>
        
        {/* Ticket */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-green-500 mb-8 overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-green-600 text-white p-4 text-center">
            <div className="text-xl font-bold">ThankYou</div>
            <div className="text-sm opacity-90">For Your Trust</div>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-sm text-gray-600">Ticket Number</div>
                <div className="text-xl font-bold text-gray-800">{ticketData.ticketNumber}</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600">Issued On</div>
                <div className="font-medium">{ticketData.issueDate}</div>
                <div className="text-sm">{ticketData.issueTime}</div>
              </div>
            </div>
            
            {/* Ticket Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <div className="border-2 border-dashed border-green-400 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Route</div>
                      <div className="text-lg font-bold">
                        {bookingData?.bus?.routeId === 1 
                          ? 'Mji to Suza' 
                          : 'Suza to Mji'}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Bus Number</div>
                      <div className="font-bold">{bookingData?.bus?.plateNumber || 'T123ABC'}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Departure</div>
                      <div className="font-bold">{ticketData.departureTime}</div>
                      <div className="text-sm">{ticketData.departureDate}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Boarding Station</div>
                      <div className="font-bold">{bookingData?.bus?.currentStation || 'Tobo la pili'}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Seats</div>
                      <div className="font-bold">
                        {bookingData?.selectedSeats?.join(', ') || '12, 13'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Valid Until</div>
                      <div className="font-bold">{ticketData.validUntil}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600">Passenger</div>
                  <div className="font-bold text-lg">1 Adult</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ticket Price:</span>
                    <span>{formatCurrency(bookingData?.totalPrice - (bookingData?.luggageCount * 500) || 1000)}</span>
                  </div>
                  
                  {bookingData?.luggageCount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Luggage ({bookingData?.luggageCount}):</span>
                      <span>{formatCurrency(bookingData?.luggageCount * 500)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(bookingData?.totalPrice ||1000)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs mb-2">QR Code</div>
                        <div className="text-3xl">◻◻◻◻</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              <p>Present this ticket and a valid ID to board the bus</p>
              <p className="mt-1">Ticket is valid only for the date and time specified</p>
            </div>
          </div>
        </div>
        
        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Journey Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Route</div>
                    <div className="text-gray-600">
                      {bookingData?.bus?.routeId === 1 
                        ? 'Mjini to Suza' 
                        : 'Suza to Mjini'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Calendar size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Departure</div>
                    <div className="text-gray-600">
                      {ticketData.departureDate} at {ticketData.departureTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Bus size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Bus Details</div>
                    <div className="text-gray-600">
                      {bookingData?.bus?.plateNumber || 'T123ABC'} • {bookingData?.bus?.totalSeats || 50} seats
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Passenger Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                    <User size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Passengers</div>
                    <div className="text-gray-600">
                      {bookingData?.passengers || 1} traveler{bookingData?.passengers > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Armchair size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Seats</div>
                    <div className="text-gray-600">
                      {bookingData?.selectedSeats?.join(', ') || '12, 13'}
                    </div>
                  </div>
                </div>
                
                {bookingData?.luggageCount > 0 && (
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <Luggage size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Luggage</div>
                      <div className="text-gray-600">
                        {bookingData?.luggageCount} item{bookingData?.luggageCount > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="font-medium text-gray-800">Payment Method</div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Mobile Money
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">TX-{Math.floor(Math.random() * 1000000)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span>{ticketData.issueDate} {ticketData.issueTime}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>{formatCurrency(bookingData?.totalPrice - (bookingData?.luggageCount * 500) ||1000)}</span>
                </div>
                
                {bookingData?.luggageCount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Luggage Fee:</span>
                    <span>{formatCurrency(bookingData?.luggageCount * 500)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-300">
                  <span>Total Paid:</span>
                  <span className="text-green-600">{formatCurrency(bookingData?.totalPrice || 1000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <h3 className="font-semibold text-blue-800 mb-3">Your Next Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Download or print your ticket for boarding</li>
            <li>Arrive at the station at least 30 minutes before departure</li>
            <li>Present your ticket and valid ID to the conductor</li>
            <li>Have a safe and pleasant journey!</li>
          </ol>
        </div>
        
        {/* Final Action Buttons - Hidden when printing */}
        <div className="flex flex-wrap justify-center gap-4 print:hidden">
          <button
            onClick={handleNewBooking}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
          >
            Make Another Booking
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
      
      {/* Footer Note - Only visible when printed */}
      <div className="hidden print:block text-center text-xs text-gray-500 mt-12">
        <p>This is a computer-generated receipt. No signature is required.</p>
        <p>ALIVOSEMA Supervisor • support@alivosema.co.tz • +255 123 456 789</p>
        <p>Valid only for the journey specified above</p>
      </div>
    </div>
  );
};

export default Receipt;