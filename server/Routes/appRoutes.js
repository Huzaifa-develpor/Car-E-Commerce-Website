const express = require('express')
const {insertProduct, viewProduct,deleteProduct,updateProductStatus,updateProduct, categoryProduct, searchProduct,getProductModel,productDetail} = require('../Controllers/productController')

const webRoutes = express.Router()

webRoutes.post('/additems', insertProduct)
webRoutes.get('/view', viewProduct)
webRoutes.delete('/delete/:id', deleteProduct)
webRoutes.put('/update/:id', updateProduct)
webRoutes.put('/updatestatus/:id', updateProductStatus)
webRoutes.get('/category/:category', categoryProduct)
webRoutes.get('/search/:name', searchProduct)
webRoutes.get('/search/:model', getProductModel)
webRoutes.get('/product/:id', productDetail)


module.exports = webRoutes