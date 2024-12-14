const exp=require('express')
const product=exp.Router()
const productModel=require("../../schema/productSchema")
const cartModel=require('../../schema/cartSchema')
const multer=require('multer')
const checkToken = require('../../middelware/middleware')
const fs = require('fs')
const { match } = require('assert')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        
    cb(null,'image')
    },
    filename:(req,file,cb)=>{
        
            const uniqueSuffix = Date.now()+file.originalname
            cb(null,uniqueSuffix)

    }
})

const upload = multer({storage:storage})

product.post("/addProduct",checkToken,upload.array('product_img',12),(req,res)=>{
    req.body=JSON.parse(req.body.data)
    // console.log(req.body)
    
    productModel.find({product_name:req.body.product_name}).then((data,err)=>{
        
        if(data.length>0){
            res.json({code:0,message:"product already added"})
        }
        else{
            console.log(req.files)
            let image_name=[]
            for(let i=0;i<req.files.length;i++){
                image_name.push(req.files[i].filename)
            }
            const product=productModel({
                product_id:req.body.product_id,
                product_name:req.body.product_name,
                product_type:req.body.product_type,
                product_price:req.body.product_price,
                product_color:req.body.product_color,
                product_quantity:req.body.product_quantity,
                product_active:req.body.product_active,
                product_img:image_name


            })
            product.save().then((data,err)=>{
                if(err){
                    res.json({code:0,message:"something went wrong"})
                }
                else{
                    res.json({code:1,message:"product is added"})
                }
            })
        }
        
    })
})


product.get('/getProduct/:page/:limit',checkToken,async (req,res)=>{
    

    let allProduct= await productModel.find().skip(req.params.page*req.params.limit).limit(req.params.limit)
    res.json({code:1,message:"product fetched",response:allProduct})

})

product.post('/updateProduct',checkToken,upload.single('product_img'),(req,res)=>{
    productModel.updateOne({product_name:req.body.product_name},{$set:{product_color:req.body.product_color},$set:{product_type:req.body.product_type},$set:{product_price:req.body.product_price},$set:{product_img:req.file.filename},$set:{product_quantity:req.body.product_quantity}}).then((data,err)=>{
        if(err){
            res.json({code:0,message:"someting went wrong"})
        }
        else{
            res.json({code:1,message:"product is updated"})
        }

    })
   
    
product.post('/deleteProduct',checkToken,async (req,res)=>{
    productModel.deleteOne({_id:req.body._id}).then((data,err)=>{
        if(err){
            res.json({code:0,message:"something went wrong"})
        }
        else{
            res.json({code:1,mesage:"product is deleted"})
        }
    })
    
})
})

product.post('/addCartProduct',(req,res)=>{
    cartModel.findOne({user_id:req.body.user_id}).then((matched,err)=>{
        if(matched){
            // console.log(req.body)
            let total_price=req.body.discount?(req.body.total_price-req.body.total_price*(req.body.discount/100))*req.body.quantity:req.body.quantity*(req.body.total_price)
            matched.total_price=matched.total_price+total_price
            let updateQuantity=false
            for(let i=0;i<matched.cart_items.length;i++){
                if(matched.cart_items[i]._id==req.body._id){
                    // console.log(matched.cart_items[i].quantity)
                    matched.cart_items[i].quantity=matched.cart_items[i].quantity+req.body.quantity
                    console.log(matched.cart_items[i].quantity)
                    updateQuantity= true
                    break;
                }
            }

            !updateQuantity?matched.cart_items.push({_id:req.body._id,quantity:req.body.quantity}):null

            
            

            cartModel.updateOne({user_id:req.body.user_id},{$set:{total_price:matched.total_price,cart_items:matched.cart_items}}).then((updated,err)=>{
                if(err){
                    res.json({code:0,message:"update went wrong"})
                }
                else{
                    res.json({code:1,message:"cart is updated succesfully"})
                }
            })
                }
        else if(!matched){
            console.log(req.body)
            const cart=cartModel({
                user_id:req.body.user_id,
                cart_items:[{_id:req.body._id,quantity:Number(req.body.quantity)}], 
                discount:req.body.discount,
                total_price:req.body.discount?req.body.quantity*(req.body.total_price-req.body.total_price*(req.body.discount/100)):req.body.quantity*(req.body.total_price)
            })

            cart.save().then((data,err)=>{
                if(err)
                {
                    res.json({code:0,message:"something went wrong"})
                }
                else{
                    res.json({code:1,message:"product is added to your cart"})
                }
            })

        }
        else{
            res.json({code:0,mesage:"something went wrong2 "})
        }
    })
})

product.post('/deleteItem',(req,res)=>{
    cartModel.updateOne({user_id:req.body.user_id},{$pull:{$in:{cart_items:{_id:req.body._id}}}}).then((data,err)=>{
        if(err){
            res.json({code:0,message:"something went wrong"})
        }
        else{
            console.log(data)
            res.json({code:1,message:"product is deleted"})
        }
    })
})



product.get('/getCart/:user_id',(req,res)=>{
    cartModel.findOne({user_id:req.params.user_id}).then((data,err)=>{
        if(err){

        }
        else if(!data){
            res.json({code:0,messsage:"card is empty"})
        }
        else{
            res.json({code:1,message:"cart product",response:data})
        }
    })
})




product.get('/cartPrice/:user_id',(req,res)=>{
    
    cartModel.findOne({user_id:req.params.user_id}).then((data,err)=>{
        if(err){
            res.json({code:0,message:"soemthing went wrong"})
        }
        else if(data){
            console.log(data)
             let items=data.cart_items
            let response=[]
            let quantity=[]
            let total_price=data.total_price
            let count=0
            items.map((ele,ind)=>{
                productModel.findOne({_id:ele}).then((data,err)=>{
                    count++
                    if(err){

                        res.json({code:0,message:"someting went wrong"})
                    }
                    else{
                    
                        
                        response.push(data)
                        quantity.push(ele.quantity)
                        // console.log(response)
                        // console.log(ind,items.length)
                        if(count==items.length){
                            //  console.log(ele.quantity)
                         res.json({code:1,message:'cart',response:response,quantity:quantity,total_price:total_price})
                        }
                      

                    }
                })
            })
           
        }
        else{
            res.json({code:0,message:"cart is empty"})
        }
    })
})

product.get("/productDetail/:_id",(req,res)=>{
    let _id=req.params._id
    productModel.findOne({_id:req.params._id}).then((data,err)=>{
        if(err){
            res.json({code:0,message:"something went wrong"})
        }
        else{
            res.json({code:1,message:"data is fetched",result:data})
        }
    })
})



product.post('/deleteCartItem',(req,res)=>{
    cartModel.findOne({user_id:req.body.user_id}).then((matched,err)=>{
        if(matched){
            
            console.log(matched.cart_items)
            matched.total_price=matched.total_price-req.body.product_price
            // console.log(matched.total_price)
            for(let i=0;i<matched.cart_items.length;i++){
                console.log(matched.cart_items[i]._id)
                console.log(req.body._id)
                if(matched.cart_items[i]._id==req.body._id){
                    console.log(matched.cart_items[i].quantity)
                    if(matched.cart_items[i].quantity>1){
                    matched.cart_items[i].quantity=matched.cart_items[i].quantity-req.body.quantity
                    console.log(matched.cart_items[i].quantity)
                    break;
                }
                    else{
                        matched.cart_items.splice(i,1)
                        console.log(matched.cart_items)
                        
                    }
                }
                else{
                    console.log("ssss")
                }
            }
            
            cartModel.updateOne({user_id:req.body.user_id},{$set:{total_price:matched.total_price,cart_items:matched.cart_items}}).then((data,err)=>{
                if(data){
                    if(!cart_items|| cart_items==[]){
                        cartModel.deleteOne({user_id:req.body.user_id}).then((data,err)=>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                res.json({mesage:"cart is empty"})
                            }
                        })
                    }
                    else{
                    res.json({result :data})
                    }
                }
            })
            
            
        }
        else if(!matched){
            res.json({code:0,message:"cart is not present"})
        }
        else{
            res.json({code:0,message:"something went wrong"})
        }
    })
})


product.get('/searchProduct/:key',(req,res)=>{
    console.log(req.params.key)

    // yeh work krega search me , par price ya iske sath nhi kr skte , because $lte ya $gte string pe fail hote h

    // aur kuch ??
    // sir frontend se bhi chl jayega

    productModel.find({$or:[{product_name:{$regex:req.params.key,"$options": "i" }},{product_color:{$regex:req.params.key,"$options": "i" }},{product_type:{$regex:req.params.key,"$options": "i" }},]}).then((data,err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json({result:data})
        }
    })
})




module.exports=product