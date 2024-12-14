import axios from "axios"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Seller from "./sellerForm";

function Registeration(){
    const [user ,setUser]= useState({})
    const [seller,setSeller]=useState(false)
    const data=JSON.stringify({first_name:user.first_name,last_name:user.last_name,mobile:user.mobile,dob:user.dob,mobile:user.mobile,email:user.email,password:user.password,role:user.role})
    const formData = new FormData();
    formData.append("data",data);

    console.log(data)
    function registeruser(){
        
        if(user && user.email && user.email.includes("@") && user.password && user.password.length>=8 && user.first_name && user.last_name && user.mobile &&user.mobile.length==10 && user.dob && user.dob.length==10 ){
            axios.post("http://localhost:2000/auth/register",formData).then((data,err)=>{
                if(data.data.status){
                    toast.success(data.data.message)
                }
                else{
                    toast.error(data.data.message)
                }
            })
            if(user.role=='seller'){
                
            }

        }
        else{   
            toast.error("invalid detail");
            return
        }
        
    }
    
    return(<>
    <div style={{backgroundColor:"black",height:800 }}>
    <ToastContainer />
    <div className="container"style={{height:400,display:"flex",alignItems:"center", backgroundColor:"purple", }}>
            <img src=""></img>
        <div className="container " style={{margin:50}} > 
        <div className="row">
        <h1 className=":d-flex">registration Page</h1>
            <div className="col-6">
                {(!user.first_name || user.first_name=="")&& <span id="last-name-error">please enter a first name</span>}
                <input  onInput={(e)=>{setUser({...user,first_name:e.target.value})}} style={{marginTop:20}}  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!user.last_name||user.last_name=="")&&<label>Last Name</label>}
                <input onInput={(e)=>{setUser({...user,last_name:e.target.value})}} style={{marginTop:20}}  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!user.email||!user.email.includes("@"))&&<label>please enter correct email</label>}
                <input onInput={(e)=>{setUser({...user,email:e.target.value})}} style={{marginTop:20}}  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!user.password||user.password==""||user.password.length<8)&&<label>please enter 8digit  password</label>}
                <input onInput={(e)=>{setUser({...user,password:e.target.value})}} style={{marginTop:20}}  type="password" className="form-control"></input>
            </div> <div className="col-6">
               {(!user.mobile||user.mobile==""||user.mobile.length<10)&& <label> please enter correct mobile number</label>}
                <input onInput={(e)=>{setUser({...user,mobile:e.target.value})}} style={{marginTop:20}} type="number"  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!user.dob||user.dob==""||user.dob.length==10)&&<label>please enter a correct dob</label>}
                <input type="date" onInput={(e)=>{setUser({...user,dob:e.target.value})}} style={{marginTop:20}}  className="form-control"></input>
            </div>
            <div className="col-6">
                <label>please enter your role   </label>
                <select onChange={(e)=>{setUser({...user,role:e.target.value})}}>
                    <option  value={"buyer"}>buyer</option>
                    <option  value={"seller"}>seller</option>
                </select>
            </div> 
            <div className="col-6 " >
              {user.role!='seller'? 
              <button className="btn btn-danger w-50  " onClick={()=>{registeruser()}}  style={{marginLeft:44,marginTop:15,position:"absoloute"}}>Register</button>:null}
            </div>
    {user.role=='seller'?<div style={{position:"relative"}}>
        <Seller data={user} ></Seller>
    
    </div> : null}    
        </div>
        </div>        
        </div>
    </div>
    </>)
}

export default Registeration