import { useState } from "react"
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login(){
    const [user,setUser]=useState({})
    let nav=useNavigate()
    function userLogin(){
        console.log(user)
        if(user.email && user.password ){

            axios.post('http://localhost:2000/auth/login',user,{withCredentials:true}).then((data,err)=>{
                if(data.data.code>0){
                    toast.success(data.data.message)
                    localStorage.setItem('token',data.data.token)
                    localStorage.setItem( '_id',data.data.result._id)
                    localStorage.setItem('email',data.data.result.email)
                    nav('/')
                }
                else{
                    toast.error(data.data.message)
                }
            })
        }
        else{
            toast.error("Enter the Credential")
        }
    }

    function check(){
        axios.get('http://localhost:2000/readSession',{withCredentials:true}).then((data,err)=>{
            if(data){
                console.log(data)
            }
        })
    }
    function generateOtp(){
        if(user.email){
            axios.get(`http://localhost:2000/auth/generateOtp/${user.email}`).then((otpGenerated,err)=>{
                if(otpGenerated){
                    toast.success(otpGenerated.data.message)
                    nav('/forgotpassword')
                }
                else{
                    toast.error(generateOtp.data.messsage)
                }
            })
        }
    }
    return(<>
    <div className="container2">
    <ToastContainer />
<div className="logo"><h1>Login</h1></div>
<div className="login-item">
<form action="" method="post" className="form form-login">
    <div className="form-field">
        <label className="user" for="login-username"></label>
        <input type="text" className="form-input" onInput={(e)=>{setUser({...user,email:e.target.value})}} placeholder="Username"  />
    </div>

    <div className="form-field">
        <label className="lock" for="login-password"></label>
        <input type="password" className="form-input" onInput={(e)=>{setUser({...user,password:e.target.value})}} placeholder="Password" />
    </div>
    <div className="form-field">
        <input type="button" className="form-control"  style={{width:500,backgroundColor:"red"}} onClick={()=>{userLogin()}} value="Log in"/>	
        <input type="button" className="form-control"  style={{width:500,backgroundColor:"red"}} onClick={()=>{generateOtp()}} value="forgot password"/>	

    </div>
                
</form>
</div>
</div>
<input type="button" className="form-control"  style={{width:500,backgroundColor:"red"}} onClick={()=>{check()}} value="check"/>	

    </>)
}
export default Login