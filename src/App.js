import Login from './screens/Login';
import './App.css';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import MyCart from './components/MyCart.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Checkout from './components/Checkout.js';
import MyOrders from './components/MyOrders.js';
import About from './components/About.js';
import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Routes,
  Link,

} from "react-router-dom";
import { CartProvider } from './components/ContextReducer.js';
import Sign from './screens/Sign.js';

function App() {
  return (
   <>
<CartProvider>
<Router>
  <Routes>
  <Route path="/myOrder" element={<MyOrders />} />
  <Route path="/about" element={<About />} /> 
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/createUser' element={<Sign/>}/>
    <Route exact path="/MyCart" element={<MyCart />} />
    <Route exact path="/checkout" element={<Checkout />} />
  <Route path="/orders" element={<MyOrders />} />
   </Routes>
  </Router>
</CartProvider>
   </>
  );
}

export default App;
