import { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'
import { data } from 'jquery'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Common from '../common/captalize'



function Card(props){
  const product_img=props.image
  var common= new  Common()
  // console.log(product_img)
  const [ind,setInd]=useState(0)
  const product_price=props.price
  const product_name=props.name
  const item=props._id
  const quantity=props.quantity
  const [productQuantity,setProductQuantity]=useState()

  const user_id=localStorage.getItem('email')
  let nav=useNavigate()
  function addToCart(){
    const data={user_id:user_id,_id:item,total_price:parseInt(product_price),quantity:productQuantity}
   if(user_id && user_id!="") {axios.post('http://localhost:2000/product/addCartProduct',data).then((data,err)=>{
      if(err){
       
      }
      else{
       console.log(data)
        toast.success(data.data.message)
        let temp =0       
        setProductQuantity(temp)
      }
    })}
    else{
      toast.error('user not login')
    }
  }


  function details(){
    nav('detail/'+props._id)
  }

  
    return(<>
 


 
<div className="bg-text1 mt-3"><div className="card" style={{"width": "18rem;",}}>
  <img className="card-img-top" style={{height:"300px"}} src={"http://localhost:2000/productDetail/"+product_img[ind]} alt="Card image cap"/>
  <div className="card-body" style={{backgroundColor:"#24262b",color:"white"}}>
    <hr></hr>
    <div className='row'>{product_img.map((ele,ind)=>{return (<div className='col-4 '><button onClick={()=>{setInd(ind)}}><img style={{height:"85px"}} src={"http://localhost:2000/productDetail/"+product_img[ind]}></img></button></div>)})} </div>
    <hr></hr>
    <h5 className="card-title">{common.Capital(product_name)}</h5>
    <p className="card-text">Rs-{product_price}</p>
    <p>number of quantity left {quantity}</p>
    <input type="number" className='form-control' value={productQuantity} defaultValue={1}  onInput={(e)=>{e.target.value<=quantity?setProductQuantity(Number(e.target.value)):setProductQuantity(1)}} ></input>
    <a  className="btn btn-primary" onClick={()=>{addToCart()}}>add to cart</a>
    <a  className="btn btn-primary" onClick={()=>{details()}}>view detail</a>
    <ToastContainer></ToastContainer>

  </div>
</div></div>



    </>)
}

export default Card