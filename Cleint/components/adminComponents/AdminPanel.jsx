import { useState } from "react";
import {useNavigate} from "react-router-dom"
import Dashboard from "./Dashboard";
import Users from "./Users";
import Orders from "./Orders";
import Product from "./Product";


const navItems = [
  { key: "dashboard", label: "Dashboard", icon: "▦"  },
  { key: "users",     label: "Users",     icon: "👤" },
  { key: "orders",    label: "Orders",    icon: "📦" },
  { key: "products",  label: "Products",  icon: "🛍️" },
];

const pages = {
  dashboard: <Dashboard />,
  users:     <Users />,
  orders:    <Orders />,
  products:  <Product />,
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [active, setActive]           = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-56 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>

        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-gray-100">
          <span className="text-lg font-semibold text-gray-800">🛒 CarZone</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3
                px-3 py-2.5 rounded-lg
                text-sm font-medium transition-colors
                ${active === item.key
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"}
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="text-sm font-medium text-gray-700 mt-0.5">Admin</p>
        </div>

      </aside>

      {/* Right side */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3">
          <button
            className="md:hidden text-gray-500 text-xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-base font-semibold text-gray-800 capitalize">
            {active}
          </h1>
          <div className="ml-auto w-8 h-8 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-semibold">
            A
          </div>
          <button 
            className=" h-8 w-20 border rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-800 hover:text-white transition"
            onClick={() => navigate('/login')}
          >
            Logout
          </button>
        </header>

        {/* Active page render hoga yahan */}
        <main className="flex-1 overflow-y-auto p-5">
          {pages[active]}
        </main>

      </div>
    </div>
  );
}