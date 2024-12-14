
const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
    user_id:({type:String,required:true}),
    total_price:({type:Number,required:true}),
    cart_items:({type:Array,required:true}),
    discount:({type:Number}),
    createdBy:({type:Date,default:Date.now()})
})

const cartModel=mongoose.model('cart',cartSchema)

module.exports=cartModel