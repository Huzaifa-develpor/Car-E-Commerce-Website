import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const CategoryItems = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [categoryItems, setCategoryItems] = useState([]);

  useEffect(() => {
    axios.get(`https://car-e-commerce-website-production.up.railway.app/web/api/products/category/${name}`)
      .then((res) => {
        setCategoryItems(res.data.categoryItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  const brandName = name?.charAt(0).toUpperCase() + name?.slice(1);

  return (
    <>
      <Navbar />

      <div className="bg-[#F8F7F4] min-h-screen px-6 md:px-12 py-10">

        {/* Heading */}
        <div className="mb-7">
          <p className="text-xs text-[#6B6B6B] uppercase tracking-widest font-medium mb-1">
            Category
          </p>
          <h1 className="font-['Syne'] font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            {brandName} Cars
          </h1>
          {categoryItems.length > 0 && (
            <p className="text-sm text-[#6B6B6B] mt-1">
              {categoryItems.length} {categoryItems.length === 1 ? 'car' : 'cars'} available
            </p>
          )}
        </div>

        {/* Grid */}
        {categoryItems.length > 0 ? (

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryItems.map((product) => (

              <div
                onClick={() => navigate(`/product/${product._id}`)}
                key={product._id}
                className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden cursor-pointer hover:border-red-600/30 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col"
              >
                {/* Image */}
                <div className="bg-[#F8F7F4] h-40 flex items-center justify-center border-b border-black/[0.05] p-3">
                  <img
                    className="h-full w-full object-contain"
                    src={product.thumbnail}
                    alt={product.carName}
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-1">
                  <p className="font-['Syne'] font-semibold text-[15px] text-[#111111] leading-tight">
                    {product.carName}
                  </p>
                  <p className="text-xs text-[#6B6B6B]">
                    {product.title}
                  </p>
                  <p className="font-['Syne'] font-bold text-lg text-red-600 mt-2">
                    {product.price}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[11px] text-[#6B6B6B] bg-black/[0.04] px-2 py-0.5 rounded">
                      {product.year}
                    </span>
                    <span className="text-[11px] text-[#6B6B6B] bg-black/[0.04] px-2 py-0.5 rounded">
                      {product.mileage}
                    </span>
                  </div>
                </div>

              </div>

            ))}
          </div>

        ) : (

          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.07] flex items-center justify-center text-3xl mb-2">
              🚗
            </div>
            <p className="font-['Syne'] font-bold text-xl text-[#111111]">
              No cars found
            </p>
            <p className="text-sm text-[#6B6B6B]">
              No {brandName} cars available right now
            </p>
          </div>

        )}

      </div>
    </>
  );
};

export default CategoryItems;