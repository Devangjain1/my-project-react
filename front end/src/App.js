
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "jquery/dist/jquery"
import Navbar from './component/main/navbar';
import Registeration from './component/main/registration';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Home from './component/main/home';
import Login from './component/main/login';
import Forgotpass from './component/main/fogotpass';
import User from './component/main/userDetail';
import Product from './component/main/product';
import ProductPage from './component/main/productPage';
import CartPage from './component/main/cartPage';
import Popup from './component/main/popup';
import searchProduct from './component/main/searchProduct';
import Footer from './component/main/footer';
function App() {
  return (<>   
   
    
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      
      <Route path='/' Component={Home}></Route>
      <Route path='/login' Component={Login}></Route>
      <Route path='/registration' Component={Registeration}></Route>
      <Route path='/forgotpassword' Component={Forgotpass}></Route>
      <Route path='/user' Component={User}></Route>
      <Route path='/product' Component={Product}></Route>
      <Route path='/detail/:id' Component={ProductPage}></Route>
      <Route path='/cartpage' Component={CartPage}></Route>
      <Route path='/searchProduct/:key' Component={searchProduct}></Route>
      {/* <Route path='allproduct' Component={ProductPage}></Route> */}
   </Routes>
  <Footer></Footer>
    </BrowserRouter>
      </>

  );
}

export default App;
