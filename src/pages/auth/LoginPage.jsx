import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Bus, Settings } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const userTypes = [
    { id: 'traveler', name: 'Traveler', icon: Users, color: 'bg-primary-600 hover:bg-primary-700' },
    { id: 'conductor', name: 'Conductor/Bus Operator', icon: Bus, color: 'bg-success-500 hover:bg-success-600' },
    { id: 'admin', name: 'Admin', icon: Settings, color: 'bg-secondary-600 hover:bg-secondary-700' }
  ];

  const handleLogin = (type) => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      navigate(`/${type === 'traveler' ? 'dashboard' : type}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-600 via-secondary-600 to-success-500">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Panel - Branding */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-primary-700 to-primary-600 p-8 md:p-12 text-white">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">DiraBasi</h1>
              <p className="text-xl opacity-90 mb-8">Uongozi Bora wa Basi</p>
              
              <div className="mt-12 space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ufuatiliaji wa Wakati Halisi</h3>
                    <p className="text-sm opacity-80">Angalia nafasi halisi ya basi lako</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                    <Bus className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tiketi Dijiti</h3>
                    <p className="text-sm opacity-80">Nunua na uhifadhi tiketi kwenye simu yako</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center mr-4">
                    <Settings className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Usalama wa Abiria</h3>
                    <p className="text-sm opacity-80">Kudhibiti usalama kwa kila safari</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-sm opacity-80">© {new Date().getFullYear()} DiraBasi. Haki zote zimehifadhiwa.</p>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Login Form */}
        <div className="w-full md:w-3/5 bg-white p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Karibu Tena</h2>
              <p className="text-gray-600">Ingia kwenye akaunti yako ili kuendelea</p>
            </div>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Barua Pepe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                    placeholder="ingiza barua pepe yako"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Nenosiri
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
                    placeholder="ingiza nenosiri lako"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Nikumbuke
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-secondary-600 hover:text-secondary-700">
                    Umesahau nenosiri?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Ingia
              </button>
            </form>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    au ingia kwa
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4">
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="h-5 w-5 text-[#DB4437]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-1.33-6.36-1.33-1.46 0-4.93-.41-6.36 1.33-.24.3-.38.68-.38 1.09 0 .41.14.79.38 1.09C7.07 19.59 9.54 20 12 20s4.93-.41 6.36-1.33c.24-.3.38-.68.38-1.09 0-.41-.14-.79-.38-1.09zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"/>
                  </svg>
                </button>
                
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="h-5 w-5 text-[#4267B2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </button>
                
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="h-5 w-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.18 5 4.05 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Bado huna akaunti?{' '}
                <a href="/register" className="font-medium text-secondary-600 hover:text-secondary-700">
                  Jisajili sasa
                </a>





              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;