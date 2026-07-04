import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const searchCar = async () => {
    if (!searchTerm) {
      setSearchResult([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/products/search/${searchTerm}`
      );
      setSearchResult(res.data.cars || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fixed: 300ms debounce instead of 3000ms
    const delay = setTimeout(() => {
      searchCar();
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <div className="relative w-full">

      {/* Input + Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search cars, brands, models…"
            className="w-full bg-white/[0.07] border border-white/10 rounded-lg py-2 pl-4 pr-4 text-sm text-white placeholder-white/35 font-['DM_Sans'] outline-none focus:border-red-600 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Link to={`/search/${searchTerm}`}>
          <button
            type="submit"
            onClick={searchCar}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 transition shrink-0"
            aria-label="Search"
          >
            <HiOutlineSearch size={16} />
          </button>
        </Link>
      </div>

      {/* Dropdown Results */}
      {searchResult.length > 0 && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-black/[0.07] max-h-60 overflow-y-auto z-50">
          {searchResult.map((item) => (
            <div
              key={item._id}
              className="px-4 py-2.5 text-sm text-gray-700 font-['DM_Sans'] hover:bg-gray-50 cursor-pointer flex items-center gap-2 border-b border-gray-100 last:border-0"
              onClick={() => {
                navigate(`/search/${item.carName}`);
                setSearchResult([]);
              }}
            >
              <HiOutlineSearch size={13} className="text-gray-400 shrink-0" />
              {item.carName}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default SearchBar;