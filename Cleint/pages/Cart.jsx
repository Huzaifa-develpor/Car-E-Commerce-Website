import React from 'react'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setLoading(false);
          navigate('/login', { replace: true });
          return;
        }

        const response = await axios.get(
          'https://car-e-commerce-website-production.up.railway.app/web/api/auth/getcart',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Cart Response:", response.data.items);
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Cart Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8F7F4]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#6B6B6B] font-['DM_Sans']">Loading your cart…</p>
        </div>
      </div>
    );
  }

  const deleteItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `https://car-e-commerce-website-production.up.railway.app/web/api/auth/removeitem/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCartItems(prev => prev.filter(item => item._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
    }
  };

  const getOrder = async (item) => {
    navigate(`/order?productId=${item}`, {
      state: {
        type: "cart",
        selectedItems: [item]
      }
    });
  };

  return (
    <>

      {/* ── Navbar ── */}
      <div className="bg-[#111111] px-6 md:px-10 h-16 flex items-center justify-between border-b border-white/[0.06]">
        <p className="font-['Syne'] font-extrabold text-xl text-white tracking-tight shrink-0">
          Car<span className="text-red-600">House</span>
        </p>
        <div className="flex-1 max-w-md mx-8">
          <SearchBar />
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="bg-[#F8F7F4] min-h-screen px-4 md:px-10 py-8">

        {/* Heading */}
        <div className="mb-6">
          <p className="text-xs text-[#6B6B6B] uppercase tracking-widest font-medium mb-1">
            Your saved items
          </p>
          <h1 className="font-['Syne'] font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="text-sm text-[#6B6B6B] mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>

        {cartItems.length > 0 ? (

          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (

              <div
                key={item._id}
                className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden hover:border-red-600/30 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12">

                  {/* Image */}
                  <div className="md:col-span-3 bg-[#F8F7F4] border-b md:border-b-0 md:border-r border-black/[0.06] flex items-center justify-center p-6 min-h-[160px]">
                    <img
                      className="h-36 md:h-44 object-contain"
                      src={item.thumbnail}
                      alt={item.carName}
                    />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-6 p-5 md:p-6 flex flex-col justify-center gap-2">
                    <h2 className="font-['Syne'] font-bold text-xl md:text-2xl text-[#111111] tracking-tight leading-tight">
                      {item.carName}
                    </h2>
                    <p className="text-sm text-[#6B6B6B] font-medium">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price + Buttons */}
                  <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-black/[0.06] p-5 md:p-6 flex flex-col justify-center gap-4">

                    <div>
                      <p className="font-['Syne'] font-bold text-xl md:text-2xl text-red-600">
                        Rs. {item.price}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[11px] text-[#6B6B6B] bg-black/[0.04] px-2 py-0.5 rounded">
                          {item.year}
                        </span>
                        <span className="text-[11px] text-[#6B6B6B] bg-black/[0.04] px-2 py-0.5 rounded">
                          {item.mileage} km
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => getOrder(item._id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-['DM_Sans'] py-2.5 rounded-lg transition"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="w-full bg-transparent hover:bg-red-50 text-red-600 text-sm font-medium font-['DM_Sans'] py-2.5 rounded-lg border border-red-200 hover:border-red-400 transition"
                      >
                        Remove
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            ))}
          </div>

        ) : (

          /* Empty state */
          <div className="flex flex-col items-center justify-center py-28 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.07] flex items-center justify-center text-3xl mb-2">
              🛒
            </div>
            <p className="font-['Syne'] font-bold text-xl text-[#111111]">
              Your cart is empty
            </p>
            <p className="text-sm text-[#6B6B6B]">
              Add some cars to get started
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-['DM_Sans'] px-6 py-2.5 rounded-lg transition"
            >
              Browse Cars
            </button>
          </div>

        )}

      </div>

      <Footer />

    </>
  );
};

export default Cart;