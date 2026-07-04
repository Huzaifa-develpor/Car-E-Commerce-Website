import { useEffect, useState } from "react";
import axios from "axios";

const badgeColor = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  cancelled: "bg-red-100 text-red-700",
  delivered: "bg-green-100 text-green-700",
};

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0,
  });

  const getDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/auth/dashboardstats",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/auth/vieworders",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardStats();
    getRecentOrders();
  }, []);

  const statsCards = [
    { label: "Total Revenue", value: `Rs ${stats.totalRevenue.toLocaleString()}`, isRevenue: true },
    { label: "Total Orders", value: stats.totalOrders, isRevenue: false },
    { label: "Total Users", value: stats.totalUsers, isRevenue: false },
    { label: "Pending Orders", value: stats.pendingOrders, isRevenue: false },
  ];

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of your system</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <h3 className={`font-bold text-gray-900 mt-2 ${item.isRevenue ? "text-lg md:text-2xl" : "text-2xl"}`}>
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>

        {/* Mobile Cards */}
        <div className="flex flex-col gap-3 md:hidden">
          {orders.map((o, index) => (
            <div key={o._id} className="border border-gray-100 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">{o.userName}</h4>
                  <p className="text-xs text-gray-500">{o.phoneNo}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[o.status] || "bg-gray-100 text-gray-700"}`}>
                  {o.status}
                </span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-400">#{index + 1}</p>
                <p className="font-bold text-gray-800">{o.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Mobile No.</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, index) => (
                <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-4 text-gray-500">{index + 1}</td>
                  <td className="py-4 font-medium text-gray-800">{o.userName}</td>
                  <td className="py-4 text-gray-500">{o.phoneNo}</td>
                  <td className="py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColor[o.status] || "bg-gray-100 text-gray-700"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 text-right font-semibold text-gray-800">{o.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}