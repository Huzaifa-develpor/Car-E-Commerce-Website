import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const getValue = (e) => {
    const { name, value } = e.target;
    setLogInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://car-e-commerce-website-production.up.railway.app/web/api/auth/login", logInData);

      if (res.data === "invalid Password" || !res.data.token) {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("token", res.data.token);

      // Admin → admin panel
      if (res.data.role === "admin") {
        navigate("/admin", { replace: true });
        return;
      }

      // Agar kisi protected page se aaya tha → wapas wahan bhejo
      // Warna → home
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
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
            Welcome back
          </p>
          <h1 className="font-['Syne'] font-bold text-2xl text-[#111111] tracking-tight">
            Log In
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-black/[0.07] rounded-2xl p-6 md:p-8">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111111] font-['DM_Sans']">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={logInData.email}
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
                value={logInData.password}
                onChange={getValue}
                placeholder="Enter your password"
                className="border border-black/[0.12] rounded-lg px-4 py-2.5 text-sm font-['DM_Sans'] text-[#111111] placeholder-[#aaa] focus:outline-none focus:border-red-600 transition"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-xs font-['DM_Sans'] bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-['DM_Sans'] py-3 rounded-lg mt-1 transition"
            >
              Log In
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-black/[0.08]" />
            <p className="text-xs text-[#6B6B6B] font-['DM_Sans']">OR</p>
            <div className="flex-1 h-px bg-black/[0.08]" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm font-['DM_Sans'] text-[#6B6B6B]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 font-medium hover:underline underline-offset-2">
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LogIn;