import { useState } from "react"
import "./login.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


function Forgotpass(){
    const [user,setUser]=useState({})
    function userLogin(){
        console.log(user)
        if(user.otp && user.password ){
            axios.post('http://localhost:2000/auth/updatePassword',user).then((passwordUpdated,err)=>{
                if(passwordUpdated){
                    toast.success(passwordUpdated.data.message)
                }
                else{
                    toast.error(passwordUpdated.data.message)
                }
            })
        }
        else{
            toast.error("Enter the Credential")
        }
    }
    return(<>
    <div className="container2">
    <ToastContainer />
<div className="logo"><h1>Forgot password</h1></div>
<div className="login-item">
<form action="" method="post" className="form form-login">
    <div className="form-field">
        <label className="user" for="login-username"></label>
        <input type="text" className="form-input" onInput={(e)=>{setUser({...user,otp:e.target.value})}} placeholder="otp"  />
    </div>

    <div className="form-field">
        <label className="lock" for="login-password"></label>
        <input type="password" className="form-input" onInput={(e)=>{setUser({...user,password:e.target.value})}} placeholder=" new Password" />
    </div>
    <div className="form-field">
        <input type="button" className="form-control"  style={{width:500,backgroundColor:"red"}} onClick={()=>{userLogin()}} value="Log in"/>	
    </div>
                
</form>
</div>
</div>
    </>)
}
export default Forgotpass