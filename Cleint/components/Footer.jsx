import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111111] border-t border-white/[0.06] mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-7 flex flex-col md:flex-row items-center justify-between gap-3">

        {/* Logo */}
        <p className="font-['Syne'] font-extrabold text-lg text-white tracking-tight">
          Car<span className="text-red-600">House</span>
        </p>

        {/* Contact */}
        <p className="text-sm text-white/40 font-['DM_Sans']">
          Contact:{" "}
          <a
            href="mailto:huzaifaanwar@gmail.com"
            className="text-white/70 hover:text-red-500 transition underline-offset-2 hover:underline"
          >
            huzaifaanwar@gmail.com
          </a>
        </p>

        {/* Copyright */}
        <p className="text-xs text-white/25 font-['DM_Sans']">
          © 2025 CarHouse. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;