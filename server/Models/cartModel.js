const mongoose = require('mongoose');

const CartItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    items: {
        type: [CartItemsSchema],
        default: []
    }
}, {
    timestamps: true
});
 const cartModel=mongoose.model('cart', cartSchema);

module.exports = cartModel;