
const express=require('express')
const userModel = require("../../schema/userSchema")
const router=express.Router()
const bcrypt=require("bcryptjs")
const multer=require('multer')
const nodemailer = require('nodemailer');
const checkToken=require('../../middelware/middleware')
const cron=require('node-cron')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        if(file.mimetype==="image/jpeg"||file.mimetype==="image/jpeg"){
            cb(null,'document/firmImage')
        }
        else{
            cb(null,'document/gstDocument')
        }
    
    },
    filename:(req,file,cb)=>{
        
            const uniqueSuffix = Date.now()+file.originalname
            cb(null,uniqueSuffix)

    }
})

const upload = multer({storage:storage})


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'updateinfomation.123@gmail.com',
      pass: 'sacz jtec uyqo nyym '
    }
  }); 





router.post("/register",upload.fields([{name:"image",maxcount:1},{name:"document",maxcount:1}]),(req,res)=>{

    req.body=JSON.parse(req.body.data)
    userModel.find({email:req.body.email}).then((data,err)=>{
        console.log(data.length,"nsao")
        if(data.length>0){
            res.json({code:0,message:"this email is already register"})
        }
        else{
            console.log(req.body.data)
            console.log(req.body.role)
       
            if(req.body.role=="seller"){
        // console.log(req.body)
        const user=userModel({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password,
            email:req.body.email,
            dob:req.body.dob,
            mobile:req.body.mobile,
            role:req.body.role,
            gst_number:req.body.gstNumber,
            firm_name:req.body.firmName,
            firmHolderName:req.body.firmHolderName,
            firm_number:req.body.firm_number,
            firm_photo:req.files.image[0].filename,
            gstDocument:req.files.document[0].filename 
            
            
        })
    console.log(user.password)
        bcrypt.hash(user.password,10).then((hashedPassord,err)=>{
            if(hashedPassord){
                user.password=hashedPassord
                user.save().then((data,err)=>{
                    if(err){
                        res.json({status:0,message:"something went wrong",err:err})
                    }
                    else{
                        res.json({status:1,message:"user is save",data:data})
                    }
    
                })
            }
        })
       }
       else{
            
        const user=userModel({

            first_name:req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password,
            email:req.body.email,
            dob:req.body.dob,
            mobile:req.body.mobile,
            role:req.body.role,
            
            
        })
    
        bcrypt.hash(user.password,10).then((hashedPassord,err)=>{
            if(hashedPassord){
                user.password=hashedPassord
                user.save().then((data,err)=>{
                    if(err){
                        res.json({status:0,message:"something went wrong",err:err})
                    }
                    else{
                        res.json({status:1,message:"user is save",data:data})
                    }
    
                })
            }
        })
       }
   
         
}
})
})



router.post("/login",(req,res)=>{
     console.log("SSSSSSSs")
    userModel.findOne({email:req.body.email}).then((data,err)=>{
        if(err){
            res.json({message:"something went wrong"})
        }
        else{
            if(data){
                bcrypt.compare(req.body.password,data.password).then((matched,err)=>{
                    if(matched){
                    const user=data
                        let token= makeid(16)
                        
                        userModel.updateOne({_id:data._id},{$set:{token:token}}).then((tokenupdated,err)=>{
                            if(tokenupdated){
                                    req.session.user=user
                                    console.log(req.session)
                            res.json({message:"successfull login",code:1 ,result:data,token:token})

                            }
                        })
                    }
                    else{
                        console.log(err)
                        res.json({message:"password does not match", code:0})
                    }
                })
            }
            else{
                console.log(err)
                res.json({message:"user is not register with this email",code:0})
            }
        }
    })
})


router.post("/updatePassword",(req,res)=>{
   userModel.findOne({otp:req.body.otp}).then((data,err)=>{
    if(err){
        res.json({code:0,message:"something went wrong"})
    }
    else if(!data){
        res.json({code:0,message:"invalid otp"})
    }
    else{
        let password=req.body.password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    console.log(err)
                }
                else{
                    password=hash
                    userModel.updateOne({otp:req.body.otp},{$set:{password:password}}).then((data,err)=>{
                        if(err){
                            res.json({code:0,message:"password not updated"})
                        }
                        else{
                            res.json({code:1,message:"password is updated"})
                        }
                    })
                }
            })
        })
    }
   })
})



router.get("/generateOtp/:email",(req,res)=>{
    let email=req.params.email

    let otp=makeid(6)

    userModel.updateOne({email:email},{$set:{otp:otp}}).then((data,err)=>{
        if(data){
            var mailOptions = {
                from: 'admin@gmail.com',
                to: email,
                subject: 'Sending otp to update password',
                text: `use this to one time password  ${otp} `
              };
              transporter.sendMail(mailOptions).then((mailSend,err)=>{
                if(mailSend){
                    userModel.updateOne({email:email},{$set:{otp:otp}}).then((otpUpdated,err)=>{
                        if(err){
                            res.json({code:0,message:"something went wrong1"})
                        }
                        else{
                            res.json({code:1,message:"otp is generated2"})     
                        }
                    })

                }
              })
        }
        else{
            res.json({code:0,message:"something went wrong"})
        }
    })
})

router.get('/getAllUser',checkToken, async (req,res)=>{
    
    
   let response= await userModel.find()
//    console.log(req.session)
    res.json({code:1,message:"user fetched",response:response})
})

router.get('/logout/:email',async (req,res)=>{
    email=req.params.email
    let response= await userModel.updateOne({email:req.params.email},{$set:{token:null}})
    
    if(response.modifiedCount>0){
        res.json({code:1,messege:'you are logout',response:response})
    }
    else if(response.modifiedCount==0){
        res.json({code:0,message:"aleready logout",response:response})
    }    
    else{
            res.json({code:0,message:"something went wrong"})
        }
})



// var task=cron.schedule('* * * * * *', () => {
//   userModel.updateMany({trialDays:{$gt:0}},{$inc:{trialDays:-1}}).then((data,err)=>{
//     if(data){
//         console.log(data)
//     }
//   })
// });

// var task2=cron.schedule('* * * * * *',()=>{
//     userModel.find({trialDays:0},{email:1,_id:0}).then((data,err)=>{
//         if(data){
//             data.forEach((ele)=>{
//                 var mailOptions = {
//                     from: 'admin@gmail.com',
//                     to: ele.email,
//                     subject: 'Sending otp to update password',
//                     html: "use this to one time password  <button>hey!</button>"
//                   };
//                   transporter.sendMail(mailOptions).then((sendMail,err)=>{
//                     if(sendMail){
//                         console.log("mail is send")
//                     }
//                     else{
//                         console.log("send")
//                     }
//                   })


//             })}
//         else{
//             console.log(err)
//         }
//     })
// })

// task2.start()


module.exports=router