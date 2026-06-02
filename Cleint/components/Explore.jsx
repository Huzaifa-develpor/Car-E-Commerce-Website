import React, { useContext } from "react";
import { productContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Explore = () => {
  const { carList } = useContext(productContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="bg-[#F8F7F4] min-h-screen px-4 md:px-12 py-10">

        <div className="mb-5">
          <p className="text-xs text-[#6B6B6B] uppercase tracking-widest font-medium mb-1">
            All listings
          </p>
          <h1 className="font-['Syne'] font-bold text-xl md:text-3xl text-[#111111] tracking-tight">
            Explore All Cars
          </h1>
          {carList.length > 0 && (
            <p className="text-sm text-[#6B6B6B] mt-1">
              {carList.length} cars available
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {carList.map((product) => (
            <div
              onClick={() => navigate(`/product/${product._id}`)}
              key={product._id}
              className="bg-white border border-black/[0.07] rounded-xl overflow-hidden cursor-pointer hover:border-red-600/30 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="bg-[#F8F7F4] h-32 md:h-40 flex items-center justify-center border-b border-black/[0.05] p-2">
                <img
                  className="h-full w-full object-contain"
                  src={product.thumbnail}
                  alt={product.carName}
                />
              </div>
              <div className="p-3 md:p-4 flex flex-col gap-1">
                <p className="font-['Syne'] font-semibold text-[13px] md:text-[15px] text-[#111111] leading-tight">
                  {product.carName}
                </p>
                <p className="text-[11px] md:text-xs text-[#6B6B6B]">
                  {product.title}
                </p>
                <p className="font-['Syne'] font-bold text-base md:text-lg text-red-600 mt-1">
                  {product.price}
                </p>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  <span className="text-[10px] text-[#6B6B6B] bg-black/[0.04] px-2 py-0.5 rounded">
                    {product.year}
                  </span>
                  <span className="text-[10px] text-[#6B6B6B] bg-black/[0.04] px-2 py-0.5 rounded">
                    {product.mileage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Explore;