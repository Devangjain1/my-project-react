import { Link, useNavigate } from "react-router-dom"
import './navbar.css'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";
import { useState,useEffect,useRef } from "react";
import Registeration from "./registration";
import Popup from "./popup";


function  Navbar(props){
  // let pop=useRef()
  const email=localStorage.getItem('email')
  const [loginstate,setLoginState]=useState(false)
  const [display,setDisplay]=useState(false)
  const [seller,setSeller]=useState(true)
  const [key,setKey]=useState()
  
  initMDB({ Dropdown, Collapse });

  useEffect(()=>{if(localStorage.getItem('token')){
    setLoginState(true)
  }},[])


//   function selectRole(e){
//     setSeller(e.target.value)
//     if(e.target.value=='seller'){
// // pop.current.click()
//     }
//   }

let nav=useNavigate()

    function logout(){
      axios.get(`http://localhost:2000/auth/logout/${email}`).then((data,err)=>{
      console.log(data)
        if(data.data.response.modifiedCount>0){
          localStorage.clear()
          setLoginState(false)
          toast.success(data.data.response.message)
          nav('/login')
        }
        else if(data.data.response.modifiedCount==0){
          toast.error(data.data.response.message)
        }
        else{
          toast.error(data.data.response.message)
        }
      })
    }

    function search(props){
      
          nav('/searchProduct/'+props)
    }
    

    


    return (<>
    
    {/* <!-- Navbar --> */}
<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary" style={{marginBottom:1,zIndex:2}}>
  {/* <!-- Container wrapper --> */}
  <div className="container-fluid" style={{backgroundColor:"#24262b", height:75,position:"fixed",top:0}} >
    {/* <!-- Toggle button --> */}
    <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    {/* <!-- Collapsible wrapper --> */}
    <div style={{color:"white"}} className="collapse navbar-collapse" id="navbarSupportedContent">
      {/* <!-- Navbar brand --> */}
      <a className="navbar-brand mt-2 "  >
        <img
          src="\./img/galaxy.png"
          height="80"
          style={{position:"relative",left:0}}
          loading="lazy"
        />
      </a>
      {/* <!-- Left links --> */}
      <ul style={{color:"white"}} className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <Link to={'/'}> <a style={{color:"white"}} className="nav-link" >Home</a></Link>
        </li>
        <li className="nav-item">
          <Link to={'/registration'}><a style={{color:"white"}} className="nav-link" >Registeration</a></Link>
        </li>
       {seller==true? <li className="nav-item">
          <Link to={'/product'}><h1  style={{color:"white"}} className="nav-link"  >addproduct</h1></Link>
        </li>:<></>}
        {seller==false? <li className="nav-item">
          <Link to={'/allproduct'}><a style={{color:"white"}} className="nav-link"  >product page</a></Link>
        </li>:<></>}
        {/* <li className="nav-item">
        <select onChange={(e)=>{selectRole(e)}} name="user-profile" style={{border:0,backgroundColor:"#24262b", position:"fixed",top:26, color:"white"}}>
            <option style={{color:"white"}} value={'buyer'}>buyer</option>
            <option style={{color:"white"}}  value={'seller'}>seller</option>
        </select>
        </li> */}
        <li>
        {/* <!-- Button trigger modal --> */}
{/* <button type="button" hidden ref={pop} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

{/* <!-- Modal --> */}

        
        </li>
        
      </ul>
      
    </div>
    
    <div className="d-flex align-items-center" >
     
      <div style={{marginRight:400}}> <input onInput={(e)=>{setKey(e.target.value)}} type="text"></input><button onClick={()=>{search(key)}}>search</button>
       </div>
      {loginstate?<div className="dropdown" style={{position:'absolute',right:"65px"}}>
        <a
          data-mdb-dropdown-init
          className="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          aria-expanded="false"
        >
          <img
            src="\./img/profile.png"
            className="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
            onClick={()=>{!display?setDisplay(true):setDisplay(false)}}
          />
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar" style={display?{display:'block'}:{display:"none"}}>
          <li>
            <a className="dropdown-item" >My profile</a>
          </li>
          <li>
            <a className="dropdown-item" >Settings</a>
          </li>
          <li>
            <a className="dropdown-item"  onClick={()=>{logout()}}>Logout</a>
          </li>
        </ul>
        
      </div>:<Link to={'/login'}><button className="btn btn-primary" style={{backgroundColor:"#24262b",borderColor:"#24262b"}}>login</button></Link>}
    <div>
      <img style={{width:20}} src='\img/wishlist.png'></img>
     <Link to={'/cartpage'}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg></Link>
    </div>
    </div>
    {/* <!-- Right elements --> */}
  </div>
  {/* <!-- Container wrapper --> */}

{/* <!-- Navbar --> */}
 

{/* <!-- Modal --> */}

</nav>
{/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">please fill seller otp</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input className="form-control"></input>
      </div>
      <div class="modal-footer">
        
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
<div className="col-md-12 " style={{backgroundColor:"black",marginTop:58, height:10,width:"100%"}}></div> */}



    
    </>)


}

export default Navbar