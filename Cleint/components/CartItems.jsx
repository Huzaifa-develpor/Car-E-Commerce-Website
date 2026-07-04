import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
  }

        const response = await axios.get(
          'https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/auth/getcart',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Cart Response:", response.data.items);
        setCartItems(response.data.items);
      } catch (error) {
        console.error(
          "Cart Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

const deleteItem = async (productId) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(
      `https://car-e-commerce-website-production-f1fd.up.railway.app/web/api/auth/removeitem/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setCartItems(prev =>
      prev.filter(item => item._id !== productId)
    );

  } catch (error) {
    console.error(
      "Error removing item:",
      error.response?.data || error.message
    );
  }
};

  const getOrder= async (item)=>{
    navigate(`/order?productId=${item}`,{
      state: {
        type: "cart"
      }
      });
  }
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="w-full  px-4 md:px-10 mt-6 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <div className="md:col-span-3 flex justify-center">
                  <img
                    className="h-40 md:h-52 object-contain"
                    src={item.thumbnail}
                    alt={item.carName}
                  />
                </div>

                <div className="md:col-span-5">
                  <h2 className="text-2xl md:text-4xl font-semibold">
                    {item.carName}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {item.title}
                  </p>

                  <p className="text-gray-600 mt-2">
                    {item.description}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col gap-4 md:items-end">
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-red-600">
                      Rs. {item.price}
                    </p>

                    <p className="text-gray-600">
                      {item.year} | {item.mileage} km
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={()=> getOrder(item._id)} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow">
                      Buy Now
                    </button>

                    <button onClick={() => deleteItem(item._id)} className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl shadow">
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[80vh] text-3xl font-bold text-gray-700">
          Your Cart is Empty
        </div>
      )}
    </>
  );
};

export default CartItems;