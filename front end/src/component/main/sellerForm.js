import { useState } from "react"
import axios from "axios"

function Seller(props){
    const user=props.data
    // console.log(user)
    const [seller,setseller]=useState({})
    const data=JSON.stringify({first_name:user.first_name,last_name:user.last_name,password:user.password,email:user.email,dob:user.dob,mobile:user.mobile,role:user.role,gstNumber:seller.gstNumber,firmName:seller.firmName,firmHolderName:seller.firmHolderName,firmNumber:seller.firmNumber})
    const formData = new FormData();

    formData.append("data",data);
    formData.append("image",seller.firmPhoto)
    formData.append("document",seller.gstDocument)
    function registerSeller(){
         console.log(data)
   


        
        axios.post('http://localHost:2000/auth/register',formData,{'Content-type':'multipart/form-data'}).then((data,err)=>{
            if(data){
                console.log(data)
            }
            else{
                console.log("err")
            }
        })
    }

   return(<> <div><div className="container" style={{display:"block",backgroundColor:"purple",color:"red",justifyContent:"center",alignItems:"center",height:250, }}>
        <div className="row">
            <div className="col-6">
                <h3>enter firm name</h3>
                <input type="text" onInput={(e)=>{setseller({...seller,firmName:e.target.value})}}></input>
            </div>
            <div className="col-6">
                <h3>enter gst number</h3>
                <input type="number"onInput={(e)=>{setseller({...seller,gstNumber:e.target.value})}}></input>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <h3>enter firm mobile number</h3>
                <input type="number"onInput={(e)=>{setseller({...seller,firmNumber:e.target.value})}}></input>
            </div>
            <div className="col-6">
                <h3>enter firm holder name</h3>
                <input type="text"onInput={(e)=>{setseller({...seller,firmHolderName:e.target.value})}}></input>
            </div>
        </div>
        <div className="row">
            <div className="col-6"> 
                <h3>upload gst document</h3>
                <input type="file" onInput={(e)=>{setseller({...seller,gstDocument:e.target.files[0]})}}></input>
            </div>
            <div className="col-6">
                <h3>upload firm photo</h3>
                <input type="file" onInput={(e)=>{setseller({...seller,firmPhoto:e.target.files[0]})}}></input>
            </div>
        </div>
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4"><button onClick={()=>{registerSeller()}} className="btn btn-danger">register</button></div>
        </div>
    </div></div></>)
}

export default Seller