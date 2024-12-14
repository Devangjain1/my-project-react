const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    product_id:{type:String,required:true},
    product_name:{type:String,required:true},
    product_type:{type:String,required:true},
    product_price:{type:Number,required:true},
    product_color:{type:String,required:true},
    product_img:{type:Array},
    product_quantity:{type:Number,required:true},
    product_active:{type:Number,required:true,default:1},
    product_added_date:{type:String,default:Date.now()}
})

const productModel=mongoose.model('product',productSchema)

module.exports=productModel