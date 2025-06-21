import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, CreditCard, Smartphone, CheckCircle,
  MapPin, Calendar, Clock, User, Armchair, Luggage
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const TicketBooking = () => {
  const navigate = useNavigate();
  const { bookingData } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState('mobile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentNumber: '',
    termsAgreed: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Simulate navigation to receipt after success
      setTimeout(() => {
        navigate('/dashboard/receipt');
      }, 2000);
    }, 1500);
  };
  
  // Handle go back to seat selection
  const handleGoBack = () => {
    navigate('/dashboard/seat-selection');
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-800">Complete Your Booking</h1>
            <p className="text-gray-600">Enter your details and payment information</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle size={64} className="text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
              Your tickets have been successfully booked. Redirecting to your receipt...
            </p>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-5 mb-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Route</h3>
                      <p className="text-gray-600">
                        {bookingData?.bus?.routeId === 1 
                          ? 'Mji to Suza' 
                          : 'Suza to Mji'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Calendar size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Departure</h3>
                      <p className="text-gray-600">
                        Today at {bookingData?.bus?.estimatedArrival}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <Armchair size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Seats</h3>
                      <p className="text-gray-600">
                        {bookingData?.selectedSeats?.join(', ') || 'No seats selected'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                      <User size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Passengers</h3>
                      <p className="text-gray-600">
                        {bookingData?.passengers || 1} traveler{bookingData?.passengers > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {bookingData?.luggageCount > 0 && (
                    <div className="flex items-start">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <Luggage size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">Luggage</h3>
                        <p className="text-gray-600">
                          {bookingData?.luggageCount} item{bookingData?.luggageCount > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Seats:</span>
                      <span>{formatCurrency(bookingData?.totalPrice - (bookingData?.luggageCount * 2000) || 0)}</span>
                    </div>
                    
                    {bookingData?.luggageCount > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Luggage:</span>
                        <span>{formatCurrency(bookingData?.luggageCount * 2000)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                      <span className="font-semibold text-lg">Total:</span>
                      <span className="font-bold text-xl text-blue-600">
                        {formatCurrency(bookingData?.totalPrice || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-blue-800 mb-3">Need Help?</h3>
                <p className="text-blue-700 mb-2">
                  Contact our customer support for assistance with your booking.
                </p>
                <div className="text-blue-700 font-medium">
                  +255 123 456 789
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Passenger Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+255 123 456 789"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mobile')}
                        className={`p-4 rounded-xl border-2 flex items-center justify-center ${
                          paymentMethod === 'mobile' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center">
                          <Smartphone size={24} className="mr-3 text-blue-500" />
                          <span>Mobile Money</span>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 flex items-center justify-center ${
                          paymentMethod === 'card' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center">
                          <CreditCard size={24} className="mr-3 text-blue-500" />
                          <span>Credit/Debit Card</span>
                        </div>
                      </button>
                    </div>
                    
                    {paymentMethod === 'mobile' && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Money Number
                        </label>
                        <input
                          type="tel"
                          name="paymentNumber"
                          value={formData.paymentNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+255 123 456 789"
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          You'll receive a payment request on your phone to complete the transaction.
                        </p>
                      </div>
                    )}
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              required
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="MM/YY"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              required
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="termsAgreed"
                        checked={formData.termsAgreed}
                        onChange={handleInputChange}
                        required
                        className="mt-1 mr-3"
                      />
                      <label className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and 
                        <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>. I understand that tickets are 
                        non-refundable but can be rescheduled 24 hours before departure.
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleGoBack}
                      className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Back to Seats
                    </button>
                    
                    <button
                      type="submit"
                      disabled={isProcessing || !formData.termsAgreed}
                      className={`px-6 py-3 rounded-lg font-medium flex items-center ${
                        isProcessing 
                          ? 'bg-blue-400 text-white cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          Processing Payment...
                          <span className="ml-2 animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                        </>
                      ) : (
                        <>
                          Pay {formatCurrency(bookingData?.totalPrice || 0)}
                          <CreditCard size={20} className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <h3 className="font-semibold text-yellow-800 mb-3">Important Information</h3>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  <li>Please arrive at the station at least 30 minutes before departure</li>
                  <li>Bring a valid ID that matches the name on your ticket</li>
                  <li>Tickets are non-transferable without prior authorization</li>
                  <li>Luggage must not exceed 20kg per passenger</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketBooking;