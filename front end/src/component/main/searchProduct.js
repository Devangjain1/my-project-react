import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Card from "./card"




function SearchProduct(){
    const {key}=useParams()
  const [searchdata,setSearchData]=useState()
  const [product,setProduct]=useState([])
  console.log(key)
    useEffect(()=>{
console.log(key)
        axios.get(`http://localhost:2000/product/searchProduct/${key}`).then((data,err)=>{
            if(data){
                console.log(data)
                setProduct(data.data.result)
            }
            else{
                // toast.error('something went wrong')
            }
        })
    },[,key])
    return(<>
{/* cards are also screen wise responsive now */}
    
<div className="row mt-5" >
 {product.map((ele)=>{return(
    <div className="col-md-3 col-sm-6 col-xs-12">
         {/* md mtlb medium scren , small mtlb tab ki screen and xs mtlb mobile ki  md pe 3 -3 ke column honge , xs screen pe 12 ka mtlb ek card ek row */}

         
         
 <Card _id={ele._id} name={ele.product_name} price={ele.product_price}  image={ele.product_img} quantity={ele.product_quantity}></Card>
 </div>
)}) }
</div>   
    </>)
}

export default SearchProduct