const exp=require('express')
const Razorpay = require('razorpay')
const pay=exp.Router()
const crypto=require('crypto')
const { error } = require('console')

pay.get("/key",(req,res)=>{
    res.json({key:"rzp_test_yvzXAvkOTKf9CP"})
})
pay.post("/payment",(req,res)=>{
    console.log(req.body)
    const instance=new Razorpay({
        key_id:"rzp_test_yvzXAvkOTKf9CP",
        key_secret:"S6RJFrGMZvAgVeW6edmGEnwq"
    });
    const options={
        amount:req.body.totalPrice*100,
        currency:"INR",
        receipt:crypto.randomBytes(10).toString('hex'),

    }
    instance.orders.create(options).then((order,error)=>{
        if(error){
            console.log(error)
        }
        else{
            res.json({code:1,data:order})
        }
    })
})

















module.exports=pay


// keyid=rzp_test_hnXybunwHrW6mA
// secertkey=EDFiCtY7sa65sYG9o8JMbXxM