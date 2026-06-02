const cartModel = require("../Models/cartModel")
const carModel = require("../Models/productsModel")

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cartProduct = await cartModel.findOne({ userId });

        if (!cartProduct) {
            cartProduct = await cartModel.create({
                userId,
                items: [{ productId }]
            });

            return res.status(201).json({
                message: "Product added to cart",
                cart: cartProduct
            });
        }

        const itemExists = cartProduct.items.find(
            item => item.productId.toString() === productId.toString()
        );

        if (itemExists) {
            return res.status(400).json({
                message: "Product already in cart"
            });
        }

        cartProduct.items.push({ productId });
        await cartProduct.save();

        return res.status(200).json({
            message: "Product added to cart",
            cart: cartProduct
        });

    } catch (error) {
        console.error("Add To Cart Error:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};

const getCartItems = async (req, res) => {
    try {
        const UserId = req.user.id;

        const cart = await cartModel.findOne({ userId:UserId });

        if (!cart || cart.items.length === 0) {
            return res.send({
                message: "No items in cart",
                items: []
            })
        }

        const cartItems = [];

        for (const item of cart.items) {
            const product = await carModel.findById(item.productId);

            if (product) {
                cartItems.push(product);
            }
        }

        return res.send({
            message: "Cart items fetched successfully",
            items: cartItems
        });

    } catch (error) {
        console.error("Get Cart Items Error:", error);
        return res.send({
            message: error.message
        });
    }
};


const removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        return res.status(200).json({
            message: "Product removed successfully",
            cart
        });

    } catch (error) {
        console.error("Remove Cart Error:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
};