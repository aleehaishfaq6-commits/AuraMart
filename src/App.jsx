import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Categoryshow from './components/Categoryshow'
import DetailsPage from './components/DetailsPage'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css'
import CartState from './contextApi/cart/cartState'
import Cart from './components/Cart'
import Search from './components/Search'
import Shop from './components/Shop'
import About from './components/About'
function App() {
  
  return (
    <>
     <div className='container'>
      <CartState>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/category/:catname' element={<Categoryshow/>}/>
        <Route exact path='/DetailsPage/:id' element ={<DetailsPage/>}/>
        <Route exact path='/Cart' element={<Cart/>}/>
        <Route path="/about" element={<About />} />
         <Route exact path='/shop' element={<Shop/>}/>
         <Route exact path='/search/:fword' element={<Search/>}/>
      </Routes>

      <Footer/>
      </BrowserRouter>
        </CartState>
     </div>
    </>
  );
}
export default App;
