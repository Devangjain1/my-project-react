import { useEffect, useState } from 'react'
import './cartCard.css'
import axios from 'axios'

function CartCard(param){
    const name=param.name
    const totalPrice=param.totalPrice
    const price = param.price
    const product_img=param.image
    const quantity=param.quantity
    const color=param.color
    // console.log(quantity)
    const _id=param._id
    const user_id=localStorage.getItem('email')
    function deleteItem(){
      const data={user_id:user_id,product_price:price,_id:_id,quantity:quantity}
      axios.post('http://localhost:2000/product/deleteCartItem',data).then((data,err)=>{
        if(err){
          console.log(err)
        }else{
          console.log("success")
        }
      })
    }
  
    return(<>
    {/* <div classNameName='col-8'  > 
        <table>
            <tr>
                <th>img</th>
                <th>detail</th>
                <th>price</th>
            </tr>
            <td><img  style={{height:100}} src={} ></img></td>
            <td>{_id}</td>
            <td> {price}</td>
        </table>
        </div>
        <div className="card mb-3" style="max-width: 540px;"> */}  

 

    {/* <div className="col-md-4">
      <img src={"http://localhost:2000/productDetail/"+product_img[0]} style={{height:200,width:200}} className="img-fluid rounded-start" alt="..."/>
    </div>
  
    <div className="col-md-4">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <hr></hr>
        <h3 className="card-text">Rs{price}</h3>
        <h2 className="card-text">quantity:{quantity}</h2>
      </div>
    </div>
    <div className='col-md-2' style={{marginTop:9}}><button onClick={()=>{deleteItem()}}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"  fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg></button></div> */}
  
    
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Cart - 2 items</h5>
          </div>
          <div class="card-body">
          
           
      

            

            {/* <!-- Single item --> */}
            <div class="row">
              <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                {/* <!-- Image --> */}
                <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={"http://localhost:2000/productDetail/"+product_img[0]}
                    class="w-100" />
                  <a href="#!">
                    <div class="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
                  </a>
                </div>
                 {/* <!-- Image --> */}
              </div>

              <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                {/* <!-- Data --> */}
                <p><strong> {name}</strong></p>
                <p>Color: {color}</p>
                

                <button type="button" onClick={()=>{deleteItem()}} class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                  title="Remove item">
                    <svg xmlns="http://www.w3.org/2000/svg" height={20}  fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                       <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
               </button>
                <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                  title="Move to the wish list">
                     <img style={{width:20}} src='\img/wishlist.png'></img>  
                </button>
                {/* <!-- Data --> */}
              </div>

              <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                {/* <!-- Quantity --> */}
                <div class="d-flex mb-4" style={{maxWidth: "300px",marginLeft:"80px"}}>
             

                  <div class="form-outline" style={{}}>
                    
                    <label class="form-label "   for="form1">Quantity:{quantity}</label>
                  </div>

                
                </div>
                {/* <!-- Quantity --> */}

                {/* <!-- Price --> */}
                <p class="text-start text-md-center">
                  <strong>Rs:{price}</strong>
                </p>
                {/* <!-- Price --> */}
              </div>
            </div>
            {/* <!-- Single item --> */}
          </div>
        </div>
       
       
      </div>
      
    
  

    </>)
}

export default CartCard