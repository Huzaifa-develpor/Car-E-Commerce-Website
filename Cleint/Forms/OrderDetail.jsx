import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const location = useLocation();
  const type = location.state?.type;
  const selectedItems = location.state?.selectedItems || [];
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const productId = queryParams.get("productId");

  const [orderDetails, setOrderDetails] = useState({
    address: "",
    phoneNo: "",
    paymentMethod: "",
  });

  // Modal ko show/hide karne ke liye state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Token guard — agar login nahi to login page pe bhejo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: { pathname: "/order" } }
      });
    }
  }, [navigate]);

  const getValue = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: { pathname: "/order" } }
      });
      return;
    }

    if (!orderDetails.address || !orderDetails.phoneNo || !orderDetails.paymentMethod) {
      alert("Please fill in all fields before placing your order.");
      return;
    }

    await axios
      .post(
        `https://car-e-commerce-website-production.up.railway.app/web/api/auth/order`,
        {
          type,
          productId: type === "single" ? productId : undefined,
          selectedItems: type === "cart" ? selectedItems : [],
          address: orderDetails.address,
          phoneNo: orderDetails.phoneNo,
          paymentMethod: orderDetails.paymentMethod,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          setShowSuccessModal(true);
        } else {
          alert("Something went wrong. Please try again later.");
        }
      }) // <-- Fixed bracket here
      .catch((error) => {
        console.error("Error placing order:", error.response?.data || error.message);
      });
  };

  // Modal ka OK button click handler
  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/"); // User ko home page pe le jayega
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4 py-12 relative">

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-['Syne'] font-extrabold text-2xl text-[#111111] tracking-tight">
            Car<span className="text-red-600">House</span>
          </p>
          <p className="text-xs text-[#6B6B6B] uppercase tracking-widest font-medium mt-4 mb-1">
            Final step
          </p>
          <h1 className="font-['Syne'] font-bold text-2xl text-[#111111] tracking-tight">
            Order Details
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-black/[0.07] rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111111] font-['DM_Sans']">
                Delivery Address
              </label>
              <input
                type="text"
                name="address"
                value={orderDetails.address}
                onChange={getValue}
                placeholder="Enter your full address"
                className="border border-black/[0.12] rounded-lg px-4 py-2.5 text-sm font-['DM_Sans'] text-[#111111] placeholder-[#aaa] focus:outline-none focus:border-red-600 transition"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111111] font-['DM_Sans']">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNo"
                value={orderDetails.phoneNo}
                onChange={getValue}
                placeholder="e.g. 03001234567"
                className="border border-black/[0.12] rounded-lg px-4 py-2.5 text-sm font-['DM_Sans'] text-[#111111] placeholder-[#aaa] focus:outline-none focus:border-red-600 transition"
              />
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111111] font-['DM_Sans']">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={orderDetails.paymentMethod}
                onChange={getValue}
                className="border border-black/[0.12] rounded-lg px-4 py-2.5 text-sm font-['DM_Sans'] text-[#111111] focus:outline-none focus:border-red-600 transition bg-white"
              >
                <option value="">Select payment method</option>
                <option value="credit-card">Credit Card</option>
                <option value="debit-card">Debit Card</option>
                <option value="cash-on-delivery">Cash on Delivery</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium font-['DM_Sans'] py-3 rounded-lg mt-1 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>

      {/* ========================================== */}
      {/* CUSTOM ORDER SUCCESS POPUP (MODAL)         */}
      {/* ========================================== */}
      {/* Fixed: Extra curly bracket removed from here */}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-black/[0.05] transform scale-100 transition-all duration-300">
            
            {/* Delivery Truck Icon Container */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 text-green-500 text-4xl shadow-inner animate-bounce">
              🚚
            </div>

            {/* Content */}
            <h3 className="font-['Syne'] font-bold text-2xl text-[#111111] mb-2">
              Order Confirmed!
            </h3>
            <p className="font-['DM_Sans'] text-sm text-[#6B6B6B] leading-relaxed mb-6">
              Your delivery is on its way. Thank you for shopping with CarHouse!
            </p>

            {/* OK Button */}
            <button
              onClick={handleModalClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold font-['DM_Sans'] py-3 rounded-xl transition duration-200 shadow-lg shadow-green-600/20 active:scale-[0.98]"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderDetail;