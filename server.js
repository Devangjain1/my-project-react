const express= require("express")
const app= express()
const cors=require("cors")
app.use(cors({credentials:true,origin:true}))
const fs=require('fs')

const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser())
require("./connection")
  
app.use(session({
    secret: "devang",
    saveUninitialized: true,
    resave: true
}));


const port=2000
app.use(express.json())
app.use("/product",require("./document/controller/product"))
app.use("/auth",require("./document/controller/user"))
app.use("/pay",require("./document/controller/payment"))
app.get('/productDetail/:img',(req,res)=>{
    const img=req.params.img
    fs.readFile(`./image/${img}`,((err,data)=>{    
        // console.log(data)
        res.end(data)
    }))
})


app.get("/readSession",(req,res)=>{
    console.log("adas")
    console.log(req.session)
})
app.listen(port,()=>{
    console.log(`server is running at ${2000}`)
})

