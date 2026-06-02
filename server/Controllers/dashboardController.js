const orderModel = require("../Models/orderModel");
const authModel = require("../Models/authModel");

const dashboardStats = async (req, res) => {
  try {

    const totalOrders = await orderModel.countDocuments();
    const totalUsers = await authModel.countDocuments();

    const pendingOrders = await orderModel.countDocuments({
      status: "pending"
    });

   const revenue = await orderModel.aggregate([
  {
    $match: {
      status: "delivered"
    }
  },
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$totalPrice" }
    }
  }
]);

    res.send({
      status: 200,
      stats: {
        totalRevenue: revenue[0]?.totalRevenue || 0,
        totalOrders,
        totalUsers,
        pendingOrders
      }
    });

  } catch (error) {
    res.send({
      status: 500,
      message: error.message
    });
  }
};

module.exports = dashboardStats;