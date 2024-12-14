import { useState } from "react"
import axios from "axios";
import { json } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function Product(){
   
    const [product,setProduct]=useState({})
   const product_id= localStorage.getItem('_id')
    const data=JSON.stringify({"product_id":product_id,"product_name":product.product_name,"product_type":product.product_type,"product_price":product.product_price,"product_color":product.product_color,"product_quantity":product.product_quantity,'product_active':1})
    const formData = new FormData();
    formData.append("data",data);
    // formData.append("product_img",    product.product_img)
    if(product.product_img){
    for(let i=0;i<product.product_img.length;i++){
        let img=product.product_img[i]
        formData.append("product_img",img)

    }}
    function addProduct(){
        axios.post("http://localhost:2000/product/addProduct",formData,{'Content-type':'multipart/form-data'}).then((data,err)=>{
            if(data.data.code>0){
                toast.success(data.data.message)
                let temp={...product}
                temp.product_name=""
                temp.product_color=""
                temp.product_price=0
                temp.product_quantity=0
                temp.product_type=""
                temp.product_img=""
                setProduct(temp)
                    

            }
            else{
                toast.error(data.data.message);
            }
        })}
    
    
    return(<><div className="main" style={{backgroundColor:"black",height:800 }}>
    <ToastContainer />
        
     <div className="container"style={{height:400,display:"flex",alignItems:"center", backgroundColor:"purple", }}>
            <img src=""></img>
        <div className="container " style={{margin:50}} > 
        <div className="row">
        <h1 className=":d-flex">registration Page</h1>
            <div className="col-6">
                {(!product.product_name || product.product_name=="")&& <span id="last-name-error">please enter a Product name</span>}
                <input  onInput={(e)=>{setProduct({...product,product_name:e.target.value})}} value={product.product_name } style={{marginTop:20}}  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!product.product_type || product.product_type=="")&&<label>product type</label>}
                <input onInput={(e)=>{setProduct({...product,product_type:e.target.value})}} value={product.product_type} style={{marginTop:20}}  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!product.product_price || product.product_price=="")&&<label>product price</label>}
                <input type="number" onInput={(e)=>{setProduct({...product,product_price:e.target.value})}} value={product.product_price} style={{marginTop:20}}  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!product.product_color || product.product_color=="")&&<label>product Color</label>}
                <input onInput={(e)=>{setProduct({...product,product_color:e.target.value})}} value={product.product_color} style={{marginTop:20}}   className="form-control"></input>
            </div> <div className="col-6">
               {(!product.product_quantity || product.product_quantity=="")&& <label>product quantity </label>}
                <input onInput={(e)=>{setProduct({...product,product_quantity:e.target.value})}} value={product.product_quantity} style={{marginTop:20}} type="number"  className="form-control"></input>
            </div>
            <div className="col-6">
                {(!product.product_img || product.product_img=="")&&<label>product image</label>}
                <input type="file" onChange={(e)=>{setProduct({...product,product_img:e.target.files})}} multiple  style={{marginTop:20}}  className="form-control"></input>
            </div>
            

            <div className="col-6 " >
                <button className="btn btn-danger w-50  " onClick={()=>{addProduct()}}  style={{marginLeft:445,marginTop:15}}>submil</button>
                <button className="btn btn-success" > change</button>
            </div>
           </div>
           </div>
           </div></div>
    
    </>)
}

export default  Product