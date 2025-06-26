// src/layouts/AdminLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaRoute, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between p-5 h-screen">
        <div>
          <h1 className="text-2xl font-bold text-green-700 mb-6">DiraBasi</h1>
          <nav className="space-y-4">
            <NavLink to="/admin/add-route" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
              <FaRoute /> Add Route
            </NavLink>
            <NavLink to="/admin/add-station" className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded">
              <FaMapMarkerAlt /> Add Station
            </NavLink>
          </nav>
        </div>

        <button
          onClick={() => navigate("/admin/login")}
          className="flex items-center gap-2 text-red-600 p-2 hover:bg-red-100 rounded"
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

export default AdminLayout;
