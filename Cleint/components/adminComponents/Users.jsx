
import { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // Fetch users
  useEffect(() => {
    axios.get("https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/auth/viewusers", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUsers(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // Search filter
  const filtered = (users || []).filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Remove user
  function removeUser(id) {
    if (window.confirm("Do you want to remove this user?")) {

      axios.delete(`https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/auth/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  // Block / Unblock
  function toggleStatus(id, currentStatus) {

    const newStatus =
      currentStatus === "active" ? "blocked" : "active";

    axios.put(
      `https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/auth/updstatus/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? { ...u, status: newStatus }
            : u
        )
      );

    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="space-y-5">

      {/* Title + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Users
        </h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full sm:w-64 outline-none focus:border-gray-400"
        />
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400">
        {filtered.length} users found
      </p>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 md:hidden">

        {filtered.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-xl border border-gray-200 p-4 space-y-2"
          >

            <div className="flex justify-between items-start">

              <div>
                <p className="font-semibold text-gray-800">
                  {u.name}
                </p>

                <p className="text-xs text-gray-400">
                  {u.email}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium
                ${
                  u.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {u.status}
              </span>

            </div>

            <p className="text-xs text-gray-500">
              Role: {u.role}
            </p>

            <div className="flex gap-2 pt-1">

              <button
                onClick={() =>
                  toggleStatus(u._id, u.status)
                }
                className="flex-1 text-xs border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50"
              >
                {u.status === "active"
                  ? "Block"
                  : "Unblock"}
              </button>

              <button
                onClick={() => removeUser(u._id)}
                className="flex-1 text-xs bg-red-50 text-red-600 border border-red-100 rounded-lg py-1.5 hover:bg-red-100"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-left text-gray-400">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((u,index ) => (

              <tr
                key={u._id}
                className="border-b border-gray-50 hover:bg-gray-50"
              >

                <td className="px-4 py-3 text-gray-400">
                  {index + 1}
                </td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {u.name}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {u.email}
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {u.role}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium
                    ${
                      u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                <td className="px-4 py-3">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        toggleStatus(u._id, u.status)
                      }
                      className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-600"
                    >
                      {u.status === "active"
                        ? "Block"
                        : "Unblock"}
                    </button>

                    <button
                      onClick={() => removeUser(u._id)}
                      className="text-xs bg-red-50 text-red-600 border border-red-100 rounded-lg px-3 py-1.5 hover:bg-red-100"
                    >
                      Remove
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No users found matching "{search}"
          </div>
        )}

      </div>

    </div>
  );
}