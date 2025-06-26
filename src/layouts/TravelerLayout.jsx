import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome, FaTicketAlt, FaMapMarkedAlt, FaBus, FaHistory, FaSignOutAlt
} from "react-icons/fa";

const TravelerLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between p-5 h-screen">
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-6">DiraBasi</h1>
          <nav className="space-y-3">
            <NavLink to="/dashboard" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"> <FaHome /> Dashboard </NavLink>
            <NavLink to="/dashboard/book" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"> <FaTicketAlt /> Book Ticket </NavLink>
            <NavLink to="/dashboard/tickets" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"> <FaHistory /> My Tickets </NavLink>
            <NavLink to="/dashboard/map" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"> <FaMapMarkedAlt /> Routes Map </NavLink>
            <NavLink to="/dashboard/availability" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"> <FaBus /> Bus Availability </NavLink>
          </nav>
        </div>

        {/* Logout button fixed at bottom */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-red-600 p-2 hover:bg-red-50 rounded"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default TravelerLayout;
