import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, { useState } from "react";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Layouts
import TravelerLayout from "./layouts/TravelerLayout";
import AdminLayout from "./layouts/AdminLayout";
import ConductorLayout from "./layouts/ConductorLayout";

// Traveler Pages
import Home from "./pages/traveler/Home";
import RouteSelector from "./pages/traveler/RouteSelector";
import StationSelector from "./pages/traveler/StationSelector";
import BusAvailability from "./pages/traveler/BusAvailability";
import SeatSelection from "./pages/traveler/SeatSelection";
import TicketBooking from "./pages/traveler/TicketBooking";
import Receipt from "./pages/traveler/Receipt";
import RouteMap from "./pages/traveler/RouteMap";

// Admin Pages
import AdminDashboard from "./pages/admin/App";
import ManageRoutes from "./pages/admin/_components/ManageRoute";
import ManageStations from "./pages/admin/_components/ManageStations";
import ManageBuses from "./pages/admin/_components/ManageBuses";
import ManageUsers from "./pages/admin/_components/ManageUsers";
import ManageConductors from "./pages/admin/_components/ManageConductors";

// Conductor Pages
import ConductorDashboard from "./pages/conductor/ConductorDashboard";
import LocationUpdate from "./pages/conductor/LocationUpdate";
import PassengerUpdate from "./pages/conductor/PassengerUpdate";

const ForgotPasswordPage = () => (
  <h2 className="text-center mt-10">Forgot Password Page (Coming soon)</h2>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <Router>
            {isAuthenticated ? (

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Traveler Routes */}
        <Route path="/dashboard" element={<TravelerLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="choose-route" element={<RouteSelector />} />
          <Route path="stations" element={<StationSelector />} />
          <Route path="bus-availability" element={<BusAvailability />} />
          <Route path="seat-selection" element={<SeatSelection />} />
          <Route path="ticket-booking" element={<TicketBooking />} />
          <Route path="receipt" element={<Receipt />} />
          <Route path="route-map" element={<RouteMap />} />
          <Route path="*" element={<RouteSelector />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="manage-routes" element={<ManageRoutes />} />
          <Route path="manage-stations" element={<ManageStations />} />
          <Route path="manage-buses" element={<ManageBuses />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-conductors" element={<ManageConductors />} />
          <Route path="*" element={<AdminDashboard />} />
        </Route>""

        {/* Conductor Routes */}
        <Route path="/conductor" element={<ConductorLayout />}>
          <Route index element={<ConductorDashboard />} />
          <Route path="location" element={<LocationUpdate />} />
          <Route path="passengers" element={<PassengerUpdate />} />
          <Route path="*" element={<ConductorDashboard />} />
        </Route>
      </Routes>
            ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </Router>
  );
}

export default App;
