const  mongoose= require('mongoose')

const orderSchema= new mongoose.Schema({
    userId: String,
    items:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"cars"
        },
        price:Number
    }],
    address:String,
    phoneNo:String,
    totalPrice:Number,
    paymentMethod:String,
    status:{
        type:String,
        enum:["pending","delivered","cancelled","processing"],
        default:"pending"
    },
    userName:String
})

const orderModel= mongoose.model("orders",orderSchema)

module.exports=orderModel