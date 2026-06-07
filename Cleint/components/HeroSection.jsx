import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#111111] px-6 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">

      {/* Red glow background effect */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Left — Text */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">

        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/30 text-red-300 text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          Pakistan's Car Marketplace
        </div>

        <h1 className="font-['Syne'] font-extrabold text-4xl md:text-5xl text-white leading-[1.05] tracking-tight mb-4">
          Find Your <br />
          <span className="text-red-600">Dream Car</span>
        </h1>

        <p className="text-white/50 text-sm md:text-base font-light max-w-sm mb-8 leading-relaxed">
          Browse the latest cars available in market — from budget picks to premium rides.
        </p>

        <button
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-['DM_Sans'] font-medium text-sm px-7 py-3 rounded-lg transition hover:-translate-y-0.5"
          onClick={() => navigate("/explore")}
        >
          Shop Now
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-10">
          <div>
            <p className="font-['Syne'] font-bold text-xl text-white">1,200+</p>
            <p className="text-xs text-white/35 mt-0.5 tracking-wide">Listings</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="font-['Syne'] font-bold text-xl text-white">6</p>
            <p className="text-xs text-white/35 mt-0.5 tracking-wide">Brands</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="font-['Syne'] font-bold text-xl text-white">24/7</p>
            <p className="text-xs text-white/35 mt-0.5 tracking-wide">Support</p>
          </div>
        </div>
      </div>

      {/* Right — Image */}
      <div className="relative z-10 w-full md:w-1/2 hidden md:flex justify-center">
        <img
          src="CarsImage.png"
          alt="Car"
          className="w-full max-w-lg object-contain drop-shadow-2xl"
        />
      </div>

    </section>
  );
};

export default HeroSection;