import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const getValue = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signUpData);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://car-e-commerce-website-production.up.railway.app/web/api/auth/register", signUpData);
      console.log(res.data);
      if (res.data.message === 'User registered') {
        navigate("/login")
      } else {
        navigate("/login")
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-['Syne'] font-extrabold text-2xl text-[#111111] tracking-tight">
            Car<span className="text-red-600">House</span>
          </p>
          <p className="text-xs text-[#6B6B6B] uppercase tracking-widest font-medium mt-4 mb-1">
            Get started
          </p>
          <h1 className="font-['Syne'] font-bold text-2xl text-[#111111] tracking-tight">
            Create Account
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-black/[0.07] rounded-2xl p-6 md:p-8">

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111111] font-['DM_Sans']">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={signUpData.name}
                onChange={getValue}
                placeholder="Enter your name"
                className="border border-black/[0.12] rounded-lg px-4 py-2.5 text-sm font-['DM_Sans'] text-[#111111] placeholder-[#aaa] focus:outline-none focus:border-red-600 transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111111] font-['DM_Sans']">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={getValue}
                placeholder="Enter your email"
                className="border border-black/[0.12] rounded-lg px-4 py-2.5 text-sm font-['DM_Sans'] text-[#111111] placeholder-[#aaa] focus:outline-none focus:border-red-600 transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111111] font-['DM_Sans']">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={signUpData.password}
                onChange={getValue}
                placeholder="Create a password"
                className="border border-black/[0.12] rounded-lg px-4 py-2.5 text-sm font-['DM_Sans'] text-[#111111] placeholder-[#aaa] focus:outline-none focus:border-red-600 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-['DM_Sans'] py-3 rounded-lg mt-1 transition"
            >
              Create Account
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-black/[0.08]" />
            <p className="text-xs text-[#6B6B6B] font-['DM_Sans']">OR</p>
            <div className="flex-1 h-px bg-black/[0.08]" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm font-['DM_Sans'] text-[#6B6B6B]">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 font-medium hover:underline underline-offset-2">
              Log In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;