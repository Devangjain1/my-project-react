import "./home.css"
import Card from "./card"
import axios from "axios"
import { useEffect,useState } from "react"
function Home(){
  const [product,setProduct]=useState([])
  const [page,setPage]=useState(0)
  const [limit,setLimit]=useState(4)
  // console.log(page)
    useEffect(()=>{
      
        axios.get(`http://localhost:2000/product/getProduct/${page}/${limit}`).then((data,err)=>{
        if(err){
          console.log(err)
        }
        else{
          console.log(data.data.response)
          let temp=[...data.data.response]
          temp.sort((a,b)=>{return a.product_price-b.product_price})
                    setProduct(temp)
          
        }
      })
    },[,page,limit])

    return(<>
    <div className="row"style={{backgroundColor:"black",height:"100%",width:"100%" , marginTop:"60px"}} >
    <div className="row">
<div className="col-md-8  " style={{position:"relative" }}>
<button  style={{position:"absolute" ,top:350,left:400,zIndex:1 ,backgroundColor:"transparent", color:"yellow", border:" 1px solid " }} aria-hidden="true">shop now</button>

<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="\./img/clothes4.jpg" style={{height:400}} class="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="\./img/clothes2.jpg" style={{height:400}} class="d-block w-100" alt="..."/>
    </div> 
    <div className="carousel-item">
      <img src="\./img/clothes3.jpg" style={{height:400}} class="d-block w-100" alt="..."/>
    </div>
  </div>
  
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>

      
</div>
<div className="row" style={{backgroundColor:"aqua"}}></div>
</div>

<div className="col-md-4  " style={{backgroundColor:"beige", height:150,position:"relative"}}>
  <div className="row">
  <div className="col-md-12" style={{backgroundColor:"#24262b",boxShadow:"5px 5px 5px #24262b",width:450, height:150,position:"relative"}}>
  <img src="\./img/tshirt.png" style={{height:100,position:"absolute",left:20,top:18}}/>
  <img src="\./img/shirt.jpg" style={{height:100,width:100,position:"absolute",top:18,left:170}}></img>
  <img src="\./img/jeans.png" style={{height:100,width:100,position:"absolute",top:18,left:320}}></img>
  </div>

  <div className="col-md-12" style={{backgroundColor:"#24262b", boxShadow:"5px 5px 5px #24262b",width:450, height:240,position:"relative",top:10}}>
  <img src="\./img/shoes.jpg" style={{height:100,position:"absolute",left:20,top:10}}/>
  <img src="\./img/watch.png" style={{height:100,width:100,position:"absolute",top:10,left:170}}></img>
  <img src="\./img/perfume.png" style={{height:100,width:100,position:"absolute",top:10,left:320}}></img>
  <img src="\./img/makeup2.jpg" style={{height:100,width:100,position:"absolute",left:20,top:130}}/>
  <img src="\./img/chain.png" style={{height:100,width:100,position:"absolute",top:130,left:170}}></img>
  <img src="\./img/bag.jpg" style={{height:100,width:100,position:"absolute",top:130,left:320}}></img>
  
</div>
</div>

</div>
</div>


    <div  className="row mt-5"  > 
     {product.map((ele)=>{return(<div className="col-md-3 col-sm-6 col-xs-12"><Card _id={ele._id} name={ele.product_name} price={ele.product_price}  image={ele.product_img} quantity={ele.product_quantity}></Card></div>)}) }
    </div>
    <div className="row">
      <div className="col-6"></div>
      <div className="col-2" style={{position :"relative",top:"10px", color:"cyan"}}>
        <div className="row">
          <div className="col-4">
            <button className="form-control" onClick={()=>{page>=1?setPage(page-1):setPage(1)}}>-</button>
          </div>
          <div className="col-2"><p>{page+1}</p></div>
          <div className="col-4"><button className="form-control" onClick={()=>{setPage(page+1)}}>+</button></div>
        </div>
      </div>
      <div className="col-4"></div>
    </div>
    <div className="row">
      <div className="col-6"></div>
      <div className="col-2" style={{position :"relative",top:"10px", color:"cyan"}}>
        <div className="row">
          <div className="col-4">
            <button className="form-control" onClick={()=>{limit>1?setLimit(limit-1):setLimit(1)}}>-</button>
          </div>
          <div className="col-2"><p>{limit}</p></div>
          <div className="col-4"><button className="form-control" onClick={()=>{setLimit(limit+1)}}>+</button></div>
        </div>
      </div>
      <div className="col-4"></div>
    </div>
    </div>
    </>)
}

export default Home