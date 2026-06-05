import React from 'react'
import Navbar from '../components/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const ItemDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)

  // ADD TO CART FUNCTION
  const addToCart = () => {
    // Button click hotey hi fresh token check karo
    const currentToken = localStorage.getItem('token')

    if (!currentToken) {
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } })
      return
    }

    const cartItem = { productId: item._id }
    
    // Fixed: currentToken ko ab variable ki tarah bheja hai, function () ki tarah nahi
    axios.post('https://car-e-commerce-website-production.up.railway.app/web/api/auth/addtocart', cartItem, {
      headers: { Authorization: `Bearer ${currentToken}` }
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  // GET PRODUCT DETAILS (ON LOAD)
  useEffect(() => {
    axios.get(`https://car-e-commerce-website-production.up.railway.app/web/api/products/product/${id}`)
      .then((res) => {
        setItem(res.data.product)
        console.log(res.data.product)
      })
      .catch((err) => console.log(err))
  }, [id])

  // BUY NOW / GET ORDER FUNCTION
  const getOrder = async () => {
    // Click hotey hi fresh token check karo
    const currentToken = localStorage.getItem('token')

    if (!currentToken) {
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } })
      return
    }
    
    navigate(`/order?productId=${item._id}`, { state: { type: "single" } })
  }

  return (
    <>
      <Navbar />

      <div className="bg-[#F8F7F4] min-h-screen px-6 md:px-16 py-10">
        {item ? (

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Image */}
            <div className="bg-white border border-black/[0.07] rounded-2xl flex items-center justify-center p-8 min-h-[320px]">
              <img
                src={item.thumbnail}
                alt={item.carName}
                className="h-72 w-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center gap-4">

              <div>
                <p className="text-xs text-[#6B6B6B] uppercase tracking-widest font-medium mb-2">
                  Car Details
                </p>
                <h1 className="font-['Syne'] font-bold text-2xl md:text-3xl text-[#111111] tracking-tight leading-tight">
                  {item.carName}
                </h1>
              </div>

              <p className="text-sm font-medium text-[#6B6B6B]">
                {item.title}
              </p>

              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                {item.description}
              </p>

              <div className="flex gap-2">
                <span className="text-[11px] text-[#6B6B6B] bg-black/[0.05] px-3 py-1 rounded-full">
                  {item.year}
                </span>
                <span className="text-[11px] text-[#6B6B6B] bg-black/[0.05] px-3 py-1 rounded-full">
                  {item.mileage} km
                </span>
              </div>

              <p className="font-['Syne'] font-bold text-3xl text-red-600">
                Rs. {item.price}
              </p>

              <div className="h-px bg-black/[0.06]" />

              <div className="flex gap-3">
                <button
                  onClick={getOrder}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-['DM_Sans'] py-3 rounded-lg transition"
                >
                  Buy Now
                </button>
                <button
                  onClick={addToCart}
                  className="flex-1 bg-transparent hover:bg-black/[0.04] text-[#111111] text-sm font-medium font-['DM_Sans'] py-3 rounded-lg border border-black/[0.12] hover:border-black/25 transition"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </div>

        ) : (

          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.07] flex items-center justify-center text-3xl mb-2">
              ⚠️
            </div>
            <p className="font-['Syne'] font-bold text-xl text-[#111111]">
              Something went wrong
            </p>
            <p className="text-sm text-[#6B6B6B]">
              Could not load car details
            </p>
          </div>

        )}
      </div>
    </>
  )
}

export default ItemDetails