import React, { useContext } from "react";
import { productContext } from "../Context/Context";
import { useNavigate, Link } from "react-router-dom";

const FeaturedCars = () => {
  const { carList } = useContext(productContext);
  const navigate = useNavigate();

  return (
    <section className="px-4 md:px-12 py-10 bg-white">

      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-['Syne'] font-bold text-xl md:text-3xl tracking-tight text-[#111111]">
          Featured Cars
        </h2>
        <Link to="/explore" className="text-xs text-red-600 font-medium hover:underline">
          See all →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {carList?.slice(0, 16).map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-[#F8F7F4] border border-black/[0.07] rounded-xl overflow-hidden cursor-pointer hover:border-red-600/30 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col"
          >
            {/* Image */}
            <div className="bg-white h-32 md:h-40 flex items-center justify-center border-b border-black/[0.05] p-2">
              <img
                src={product.thumbnail}
                alt={product.carName}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Info */}
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

    </section>
  );
};

export default FeaturedCars;