const mongoose=require("mongoose")



const userSchema=mongoose.Schema({
    first_name:{type:String,required:true,unique:true},
    last_name:{type:String,required:true},
    email:{type:String,required:[true,'user email required'],unique:true},
    password:{type:String,required:true,minLength:8},
    mobile:{type:String,unique:true},
    dob:{type:String,required:true},
    token:{type:String},
    otp:{type:String},
    created_date:{type:String,default:Date.now()},
    role:{type:String,required:true,default:"buyer"},
    gst_number:{type:String},
    firm_name:{type:String},
    firmHolderName:{type:String},
    firm_number:{type:Number},
    firm_photo:{type:String},
    gstDocument:{type:String},
    trialDays:{type:Number,default:10}



})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel