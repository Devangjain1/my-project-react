import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'

function ProductPage(props){
    const[ind,setInd]=useState(0)
     const [image,setImage]=useState([])
    const {id}=useParams()
    const [quantity,setQuantity]=useState()
    const user_id=localStorage.getItem("email")
    // console.log(id)
    const [details,setDetails]=useState()
    useEffect(()=>{
        axios.get(`http://localhost:2000/product/productDetail/${id}`).then((data,err)=>{
            if(err){
                console.log(err)
            }
            else{
                // console.log(data.data.result)
                 
                //  console.log(data.data.result.product_img)
               setDetails(data.data.result)
                setImage(data.data.result.product_img)
                
            }
        })
    },[])
    function addToCart(){
        const data={user_id:user_id,_id:id,total_price:parseInt(details?.product_price),quantity:quantity}
       if(user_id && user_id!="") {axios.post('http://localhost:2000/product/addCartProduct',data).then((data,err)=>{
          if(err){
           
          }
          else{
           console.log(data)
            toast.success(data.data.message)
            let temp =0       
            setQuantity(temp)
          }
        })}
        else{
          toast.error('user not login')
        }
      }
    console.log(image)
    
    return(<>
    <ToastContainer></ToastContainer>
    <div style={{"marginTop":"5%"}}>
       
        <div className="row">
            <div className="col-2"></div>
            <div className="col-3"><span><img style={{height:350}}  src={"http://localhost:2000/productDetail/"+details?.product_img[ind]} ></img></span></div>
            <div className="col-6"><span ><h3  >{details?.product_name} </h3></span></div>
        </div>
            
        <div className="row">
            <div className="col-5"></div>
            <div className="col-5">
                <hr></hr>
                <span>
                        <label style={{color:"red",fontSize:35}}>discount-{details?.product}</label>
                        <label style={{fontSize:35}}>{details?.product_price}</label>
                        
                </span>
            </div>
        </div>
        <div className="row">
            <div className="col-5"><div className="row">{image.map((ele,ind)=>{return(<div className="col-2"><button onClick={()=>{setInd(ind)}}><img style={{height:"85px"}} src={"http://localhost:2000/productDetail/"+image[ind]}></img></button></div>)})}</div></div>
            <div className="col-5">
                <hr></hr>
            <div className="row">
            <span className="col-6" style={{overflow:"hidden"}}>  
                <div class="card" style={{"width": "18rem;"}}>
                    <div class="card-body">
                             <lable style={{color:"red"}} class="card-title">bank offer</lable>
                            <p class="card-text">Some quick example text </p>
                    </div>
                </div>
            </span>
            <span className="col-6">
                
                <div class="card" style={{"width": "18rem;"}}>
                    <div class="card-body">
                             <lable style={{color:"red"}} class="card-title">membership offer</lable>
                            <p class="card-text">Some quick example text </p>
                    </div>
                </div>   
            </span>
            </div>
            </div>
        </div>
        <div className="row">
            <div className="col-5"></div>
            <div className="col-5">
                <hr></hr>
                <h3 >enter the quantity</h3>
                <input type="number" className="form-control" onInput={(e)=>{setQuantity(e.target.value)}}></input>
                <hr></hr>
                <div className="col-6"><button onClick={()=>{addToCart()}} className="btn btn-success">add to cart</button></div>
            </div>
        </div>
        </div>
        


    </>)
}
export default ProductPage