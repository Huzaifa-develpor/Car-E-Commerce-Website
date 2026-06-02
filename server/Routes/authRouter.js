const express = require('express');
const Router = express.Router();
const {registerUser,authUser,viewUsers,updStatus,deleteUser}= require('../Controllers/authController')
const checkToken = require('../Middleware/authMiddleware')
const {addToCart,getCartItems,removeCartItem}= require('../Controllers/cartController')
const {placeOrder,viewOrders,updateStatus}= require('../Controllers/orderController')
const dashboardStats= require('../Controllers/dashboardController')


Router.post('/register', registerUser)
Router.post('/login' , authUser )
Router.post('/addtocart', checkToken, addToCart)
Router.get('/getcart', checkToken, getCartItems)
Router.delete('/removeitem/:productId', checkToken, removeCartItem)
Router.post('/order', checkToken, placeOrder )
Router.get('/vieworders', checkToken, viewOrders)
Router.put('/updatestatus/:id', checkToken, updateStatus)
Router.get('/viewusers', checkToken, viewUsers)
Router.put('/updstatus/:id', checkToken, updStatus)
Router.delete('/deleteuser/:id', checkToken, deleteUser)
Router.get('/dashboardstats', checkToken, dashboardStats)
module.exports = Router