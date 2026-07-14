const cartModel = require("../Models/cartModel");
const carModel = require("../Models/productsModel");
const orderModel = require("../Models/orderModel");
const authModel = require("../Models/authModel");

const placeOrder = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      type,
      productId,
      selectedItems,
      address,
      phoneNo,
      paymentMethod
    } = req.body;

    let total = 0;
    let ordersItems = [];

    const user = await authModel.findById(userId);

    // ================= SINGLE ORDER =================
    if (type === "single") {

      const product = await carModel.findById(productId);

      if (!product) {
        return res.send({
          status: "error",
          message: "product not found"
        });
      }

      total = product.price;

      ordersItems.push({
        productId: product._id,
        price: product.price
      });

    
    }

    // ================= CART ORDER =================
    else if (type === "cart") {

      if (!selectedItems || selectedItems.length === 0) {
        return res.send({
          status: "error",
          message: "no items selected"
        });
      }

      const cart = await cartModel.findOne({ userId });

      if (!cart || cart.items.length === 0) {
        return res.send({
          status: "error",
          message: "cart is empty"
        });
      }

      let removeIds = [];

      for (const item of cart.items) {

        if (selectedItems.includes(item.productId.toString())) {

          const product = await carModel.findById(item.productId);

          if (product) {

            total += product.price;

            ordersItems.push({
              productId: product._id,
              price: product.price
            });

            removeIds.push(item.productId);
          }
        }
      }

      // REMOVE ONLY SELECTED ITEMS (NOT FULL CART)
      await cartModel.findOneAndUpdate(
        { userId },
        {
          $pull: {
            items: {
              productId: { $in: removeIds }
            }
          }
        }
      );
    }

    else {
      return res.send({
        status: "error",
        message: "invalid order type"
      });
    }

    // ================= CREATE ORDER =================
    const order = await orderModel.create({
      userId,
      userName: user?.name,
      items: ordersItems,
      totalPrice: total,
      address,
      phoneNo,
      paymentMethod,
      status: "pending"
    });

    return res.send({
      status: "success",
      message: "order placed successfully",
      order
    });

  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
};


const viewOrders = async (req, res) => {

  try {

    const orders = await orderModel
      .find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.send({
      status: 200,
      message: "orders list",
      orders
    });

  } catch (error) {

    res.send({
      status: 500,
      message: "error while fetching orders",
      error: error.message
    });

  }

};

const updateStatus= async(req,res)=>{
  try {

    let id = req.params.id;
    let status = req.body.status;

    const result = await orderModel.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({
        status: "error",
        message: "Order not found"
      });
    }

    res.send({
      status: "success",
      message: "Order status updated successfully",
      result
    });

  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message
    });
  }
}

module.exports = { placeOrder, viewOrders, updateStatus };