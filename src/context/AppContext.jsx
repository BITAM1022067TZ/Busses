import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const logout = () => {
    setCurrentUser(null);
    setSelectedRoute(null);
    setSelectedStation(null);
    setSelectedBus(null);
    setBookingData(null);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      selectedRoute,
      setSelectedRoute,
      selectedStation,
      setSelectedStation,
      selectedBus,
      setSelectedBus,
      bookingData,
      setBookingData,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};
