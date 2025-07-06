// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import {
  BarChart4,
  Bus,
  MapPin,
  Settings,
  Users,
  Ticket,
  Map,
  Route,
  Plus,
  Gauge,
  ArrowRightLeft,
  ArrowUpDown,
  UserRoundCog,
  MapPinned,
} from "lucide-react";

import ManageRoute from "./_components/ManageRoute";
import ManageStations from "./_components/ManageStations";
import ManageBuses from "./_components/ManageBuses";
import ManageUsers from "./_components/ManageUsers";


import { routes, stations, buses } from "../../data/mockData";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    type: "",
    name: "",
    route: "",
    capacity: "",
  });
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Stats with actual data counts
  const stats = [
    {
      title: "Total Routes",
      value: routes.length,
      icon: <Route className="text-blue-500" />,
      change: "+2",
    },
    {
      title: "Active Buses",
      value: buses.filter((b) => b.status === "active").length,
      icon: <Bus className="text-green-500" />,
      change: "+1",
    },
    {
      title: "Stations",
      value: stations.length,
      icon: <MapPin className="text-purple-500" />,
      change: `+${stations.length - 23}`,
    },
    {
      title: "Bookings Today",
      value: "1,245",
      icon: <Ticket className="text-yellow-500" />,
      change: "+8.5%",
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "conductor",
      status: "active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "traveler",
      status: "inactive",
    },
  ];

  const handleAddItem = () => {
    setIsAdding(true);
  };

  const handleSaveItem = () => {
    setIsAdding(false);
    setNewItem({ type: "", name: "", route: "", capacity: "" });
  };

  const getStationsForRoute = (routeId) => {
    return stations
      .filter((station) => station.routeId === routeId)
      .sort((a, b) => a.order - b.order);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "routes":
        return (
          <ManageRoute
            getStationsForRoute={getStationsForRoute}
            routes={routes}
            setSelectedRoute={setSelectedRoute}
            setActiveTab={setActiveTab}
          />
        );
      case "stations":
        return (
          <ManageStations
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
            stations={stations}
            routes={routes}
          />
        );
      case "buses":
        return (
          <ManageBuses buses={buses} routes={routes} stations={stations} />
        );
      case "users":
        return <ManageUsers users={users} />;
      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              System Settings
            </h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  Route Configuration
                </h3>
                <div className="space-y-4">
                  {routes.map((route) => (
                    <div
                      key={route.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded"
                    >
                      <div>
                        <h4 className="font-medium">{route.name}</h4>
                        <p className="text-sm text-gray-600">
                          {route.from} → {route.to}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  System Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Enable Real-time Tracking</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Maintenance Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default: // Dashboard
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-green-600 font-medium mt-3">
                    {stat.change} from last week
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Bus Activity
                </h3>
                <div className="space-y-4">
                  {buses.map((bus) => (
                    <div
                      key={bus.id}
                      className="flex items-start border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{bus.plateNumber}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              bus.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {bus.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {bus.currentStation}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {bus.passengerCount} passengers • Arrival:{" "}
                          {bus.estimatedArrival}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">
                  Route Status
                </h3>
                <div className="space-y-4">
                  {routes.map((route) => {
                    const routeStations = getStationsForRoute(route.id);
                    const activeBuses = buses.filter(
                      (bus) =>
                        bus.routeId === route.id && bus.status === "active"
                    );

                    return (
                      <div
                        key={route.id}
                        className="border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{route.name}</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {activeBuses.length} active buses
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ArrowRightLeft size={14} className="mr-1" />
                          <span>
                            {route.from} → {route.to}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {routeStations.length} stations • Last updated: 2h ago
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bus Supervisor Admin
          </h1>
          <p className="mt-2 text-gray-600">
            Managing routes, stations, and buses across Zanzibar
          </p>
        </div>

        <button
          onClick={handleAddItem}
          className="mt-4 md:mt-0 flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add New</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-200">
          <h3 className="font-bold text-lg text-gray-800 mb-4">Add New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={newItem.type}
                onChange={(e) =>
                  setNewItem({ ...newItem, type: e.target.value })
                }
              >
                <option value="">Select type</option>
                <option value="route">Route</option>
                <option value="station">Station</option>
                <option value="bus">Bus</option>
                <option value="user">User</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </div>

            {newItem.type === "station" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={newItem.route}
                  onChange={(e) =>
                    setNewItem({ ...newItem, route: e.target.value })
                  }
                >
                  <option value="">Select route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {newItem.type === "bus" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={newItem.capacity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, capacity: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Item
            </button>
          </div>
        </div>
      )}

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "dashboard"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart4 size={18} />
              <span>Dashboard</span>
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab("routes");
              setSelectedRoute(null);
            }}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "routes"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Route size={18} />
              <span>Routes</span>
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab("stations");
              setSelectedRoute(null);
            }}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "stations"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <MapPin size={18} />
              <span>Stations</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("buses")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "buses"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Bus size={18} />
              <span>Buses</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "users"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <UserRoundCog size={18} />
              <span>Users</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "settings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </button>
        </nav>
      </div>

      {renderContent()}
    </div>
  );
};

export default AdminDashboard;
