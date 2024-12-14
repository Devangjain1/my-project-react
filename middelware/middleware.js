const user=require("../schema/userSchema")
const session = require("express-session");

function checkToken(req,res,next){

    user.findOne({token:req.headers.Authorization}).then((data,err)=>{
        // console.log(data)
        if(data){
         next()
        }
        else{
            res.json({code:0,message:"user is not login ,please login for further process"})
        }
    })

}

module.exports=checkToken