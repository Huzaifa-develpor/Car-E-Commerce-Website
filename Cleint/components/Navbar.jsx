import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-[#111111] text-white sticky top-0 z-50 border-b border-white/[0.06]">

      {/* Row 1 — always visible */}
      <div className="px-4 md:px-10 h-14 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link to="/" className="font-['Syne'] font-extrabold text-lg tracking-tight shrink-0">
          Car<span className="text-red-600">House</span>
        </Link>

        {/* Search — desktop only, inline */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <SearchBar />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/cart"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.07] border border-white/10 hover:bg-white/[0.13] transition"
            aria-label="Cart"
          >
            <HiOutlineShoppingCart size={16} />
          </Link>

          <Link to="/login">
            <button className="text-xs font-medium font-['DM_Sans'] px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/[0.08] transition">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="text-xs font-medium font-['DM_Sans'] px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Row 2 — mobile only, search bar */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>

    </nav>
  );
}