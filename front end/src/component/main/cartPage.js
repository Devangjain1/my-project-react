import { useEffect, useState } from "react";
import CartCard from "./cartCard";
import axios from "axios";
import { data, get } from "jquery";
import { ToastContainer, toast } from "react-toastify";
import useRazorpay from "react-razorpay";
function CartPage(){
  const [Razorpay] = useRazorpay();
    const [cart,setCart]=useState()
    const [quantity,setQuantity]=useState([])
    const [product,setProduct]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const user_id=localStorage.getItem('email')
    useEffect(()=>{
        if(user_id && user_id!=""){
        axios.get(`http://localhost:2000/product/cartPrice/${user_id}`).then((data,err)=>{
            if(err){
                console.log(err)
            }
            else{if(data.data.code>0){

                setProduct(data.data.response)
                setTotalPrice(data.data.total_price)
                setQuantity(data.data.quantity)
                setCart(true)
            }
            else{
                toast.error(data.data.message)
            }

            }
        })}
        else{
            toast.error("user not login")
        }
        },[])
        
       function checkOut(){
        let key=""
        axios.get("http://localhost:2000/pay/key").then((data,err)=>{
          if(err){
            console.log(err)
          }
          else{
            console.log(data.data.key)
            key=data.data.key
          }
        })
          axios.post(`http://localhost:2000/pay/payment`,{totalPrice}).then((data,err)=>{
            if(err){
              console.log(err)
            }
            else{
              
              console.log(data.data.data.amount)

              const options = {
                key: key,
                amount: data.data.data.amount,
                currency: "INR",
                name: "galaxy clothings",
                description: "Test Transaction",
                image: "\./img/galaxy.png",
                order_id: data.data.data.id,
                handler: (res) => {
                  console.log(res);
                  if(!res){}
                  
                  
                },
                prefill: {
                  name: "Piyush Garg",
                  email: "youremail@example.com",
                  contact: "9999999999",
                },
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#3399cc",
                },
              };
          
              const rzpay = new Razorpay(options);
              rzpay.open();
            }
            
          })
        }
   
    return(<>
    <ToastContainer></ToastContainer>
   
        
        <section class="h-100 gradient-custom">
        <div className="row d-flex">
      {product.map((ele,ind)=>{return<CartCard name={ele.product_name} color={ele.product_color} price={ele.product_price} quantity={quantity[ind]} image={ele.product_img} _id={ele._id} totalPrice={totalPrice} ></CartCard>})}
      <div class="card mb-4">
          <div class="card-body">
            <p><strong>Expected shipping delivery</strong></p>
            <p class="mb-0">12.10.2020 - 14.10.2020</p>
          </div>
        </div>
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Summary</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>{totalPrice}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Gratis</span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p class="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span><strong>{totalPrice}</strong></span>
              </li>
            </ul>

            <button type="button" onClick={()=>{checkOut()}} class="btn btn-primary btn-lg btn-block">
              Go to checkout
            </button>
            <div class="card mb-4 mb-lg-0">
          <div class="card-body">
            <p><strong>We accept</strong></p>
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <img class="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
              alt="PayPal acceptance mark" />
          </div>
        </div>
          </div>
        </div>
      </div>
        </div>
</section>
      
    </>)
}

export default  CartPage