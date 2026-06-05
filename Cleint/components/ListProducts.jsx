import React from 'react'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ListProducts = () => {

  const { model } = useParams()
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [model])

  const fetchProducts = async () => {
    const res = await axios.get(
      `https://car-e-commerce-website-production.up.railway.app/web/api/products/search/${model}`
    )
    setProducts(res.data.cars || [])
  }

  // ADD TO CART
  const addToCart = async (id) => {
    const cartItem = { productId: id }
    axios.post(
      'https://car-e-commerce-website-production.up.railway.app/web/api/auth/addtocart',
      cartItem,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  // BUY NOW
  const getOrder = (id) => {
    navigate(`/order?productId=${id}`, {
      state: { type: "single" }
    })
  }

  // ITEM DETAILS
  const goToDetails = (id) => {
    navigate(`/product/${id}`)
  }

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

        {/* Results heading */}
        <div className="mb-6">
          <p className="text-xs text-[#6B6B6B] uppercase tracking-widest font-medium mb-1">
            Search results
          </p>
          <h1 className="font-['Syne'] font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            "{model}"
          </h1>
          {products.length > 0 && (
            <p className="text-sm text-[#6B6B6B] mt-1">
              {products.length} {products.length === 1 ? 'car' : 'cars'} found
            </p>
          )}
        </div>

        {/* ── Products list ── */}
        {products.length > 0 ? (

          <div className="flex flex-col gap-4">
            {products.map((item) => (

              <div
                key={item._id}
                className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden hover:border-red-600/30 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">

                  {/* Image */}
                  <div
                    onClick={() => goToDetails(item._id)}
                    className="md:col-span-3 bg-[#F8F7F4] border-b md:border-b-0 md:border-r border-black/[0.06] flex items-center justify-center p-6 cursor-pointer min-h-[180px]"
                  >
                    <img
                      className="h-36 md:h-44 object-contain"
                      src={item.thumbnail}
                      alt={item.carName}
                    />
                  </div>

                  {/* Details */}
                  <div
                    onClick={() => goToDetails(item._id)}
                    className="md:col-span-6 p-5 md:p-6 cursor-pointer flex flex-col justify-center gap-2"
                  >
                    <p className="font-['Syne'] font-bold text-xl md:text-2xl text-[#111111] tracking-tight leading-tight">
                      {item.carName}
                    </p>
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
                        onClick={() => addToCart(item._id)}
                        className="w-full bg-transparent hover:bg-black/[0.04] text-[#111111] text-sm font-medium font-['DM_Sans'] py-2.5 rounded-lg border border-black/[0.12] hover:border-black/25 transition"
                      >
                        Add to Cart
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            ))}
          </div>

        ) : (

          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.07] flex items-center justify-center text-3xl mb-2">
              🔍
            </div>
            <p className="font-['Syne'] font-bold text-xl text-[#111111]">
              No results found
            </p>
            <p className="text-sm text-[#6B6B6B]">
              No cars found for "{model}"
            </p>
          </div>

        )}

      </div>

    </>
  )
}

export default ListProducts