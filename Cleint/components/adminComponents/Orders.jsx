// pages/Orders.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const statusOptions = ["all", "pending", "processing", "delivered", "cancelled"];

const badgeColor = {
  pending:    "bg-yellow-100 text-yellow-700",
  delivered:  "bg-green-100  text-green-700",
  processing: "bg-blue-100   text-blue-700",
  cancelled:  "bg-red-100    text-red-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://car-e-commerce-website-production.up.railway.app/web/api/auth/vieworders", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setOrders(res.data.orders);
      console.log(res.data.orders);
    })
    .catch((err) => console.log(err));
  }, []);

  const filtered = (orders || []).filter((o) => {
    const matchFilter = filter === "all" || o.status === filter;
    const matchSearch =
      o._id?.toLowerCase().includes(search.toLowerCase()) ||
      o.phoneNo?.toString().includes(search);
    return matchFilter && matchSearch;
  });

  function updateStatus(id, newStatus) {
    axios.put(
      `https://car-e-commerce-website-production.up.railway.app/web/api/auth/updatestatus/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
      );
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="space-y-5">

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">Orders</h2>

      {/* Filter Tabs — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {statusOptions.map((s) => {
          const count = s === "all"
            ? (orders || []).length
            : (orders || []).filter(o => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium capitalize transition-colors whitespace-nowrap shrink-0
                ${filter === s
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}`}
            >
              {s === "all" ? `All (${count})` : `${s} (${count})`}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by customer or order ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-72 outline-none focus:border-gray-400"
      />

      {/* Count */}
      <p className="text-sm text-gray-400">{filtered.length} orders</p>

      {/* ── Mobile: Cards ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-8">No orders found.</p>
        ) : (
          filtered.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-4 space-y-3">

                {/* Row 1: Name + Badge */}
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {o.username || o.userName}
                  </p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${badgeColor[o.status] || "bg-gray-100 text-gray-700"}`}>
                    {o.status}
                  </span>
                </div>

                {/* Row 2: Car name */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>🚗</span>
                  <span className="truncate">{o.items?.[0]?.productId?.carName || "—"}</span>
                </div>

                {/* Row 3: Amount + Phone */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-gray-400 mb-0.5">Amount</p>
                    <p className="text-sm font-semibold text-gray-800">{o.totalPrice}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-gray-400 mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-gray-700">{o.phoneNo || "—"}</p>
                  </div>
                </div>

                {/* Row 4: Order ID */}
                <p className="text-[10px] text-gray-300 font-mono truncate">ID: {o._id}</p>

              </div>

              {/* Status select — bottom strip */}
              <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Desktop: Table ── */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-left text-gray-400">
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Car</th>
              <th className="px-4 py-3 font-medium">Mobile No</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, index) => (
              <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400 font-mono">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{o.userName}</td>
                <td className="px-4 py-3 text-gray-500">{o.items[0]?.productId.carName}</td>
                <td className="px-4 py-3 text-gray-500">{o.phoneNo}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{o.totalPrice}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[o.status] || "bg-gray-100 text-gray-700"}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none hover:border-gray-400 cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No orders found matching "{search}"
          </div>
        )}
      </div>

    </div>
  );
}