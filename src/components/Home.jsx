import React, { useEffect, useState } from 'react'
import Categoryshow from './Categoryshow'
import slide1 from '/assets/slide1.jpg'
import slide2 from '/assets/headphone.jpeg'
import slide3 from '/assets/slide2.jpg'
import slide4 from '/assets/slide4.avif'
import slide5 from '/assets/mobile.jpg'
import { useContext } from 'react'
import cartContext from '../contextApi/cart/cartContext'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import SpecialOffer from './Specialoffer'
const Home = () => {
    let context = useContext(cartContext)
    let {loading,setloading} =context;
    const navigate=useNavigate()
const images=[slide1,slide2,slide3,slide4,slide5]
const [currimage,setcurrimage]= useState(0)
useEffect(()=>{
const Interval=setInterval(()=>{
  setcurrimage((prev)=>
   prev === images.length-1?0:prev+1)
     
},2000)
return ()=> clearInterval(Interval)
},[])
    return (
        <>
            <div className='hero-section'>
                  {/* Background Images */}
      <div className="slider">

        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currimage ? "active" : ""}`}
            style={{
              backgroundImage: `url(${image})`
            }}
          ></div>
        ))}
        <div className='hero-overlay'></div>
      </div>
                <div className='hero-title'>
                    <h1>Discover Next-Gen Tech<br/>
                    &Premium Lifestyle<br/>
                    With AuraMart</h1>
                    <p className='des'>
                        Upgrade Your Style & Tech
                        With AuraMart <br />Discover exclusive deals on top-rated smartphones,<br /> fashion trends, and lifestyle <br />products with instant delivery.</p>
                     <div className='buttons'>
                    <button id='shop' type='button' onClick={()=>{navigate('/shop')}}>Shop Now</button>
                    <button id='explore' type='button' onClick={()=>{navigate('/shop')}}>Explore Categories</button>
                 </div>
                </div>
               
            </div>
            <div className='container'>
                <div className='categories'>
                    <h1 id='aaa'>Shop by category</h1>
                    <p>Explore our wide range of products</p>
                    <div className="boxes">
                        <div className="box" id="box1" onClick={()=>{
                            navigate('/category/:smartphones')
                        }}>
                           <div className="overlay1">
                                <h3>Smartphones</h3>
                            </div>
                        </div>

                        <div className="box" id="box2" onClick={()=>{ navigate('/category/:groceries')}}>
                            <div className="overlay2">
                                <h3>groceries</h3>
                            </div>
                        </div>

                        <div className="box" id="box3" onClick={()=>{navigate('/category/:mobile-accessories')}}>
                            <div className="overlay3">
                                <h3>Mobile Accessories</h3>
                            </div>
                        </div>

                        <div className="box" id="box4" onClick={()=>{navigate('/category/:womens-bags')}}>
                            <div className="overlay4">
                                <h3>womens-bags</h3>
                            </div>
                        </div>
                        <div className="box" id="box5" onClick={()=>{navigate('/category/:sports-accessories')}}>
                            <div className="overlay4">
                                <h3>Sports Accessories</h3>
                            </div>
                        </div>
                        <div className="box" id="box6" onClick={()=>{navigate('/category/:beauty')}}>
                            <div className="overlay4">
                                <h3>Makeup Products</h3>
                            </div>
                        </div>
                        <div className="box" id="box7" onClick={()=>{navigate('/category/:furniture')}}>
                            <div className="overlay4">
                                <h3>Furniture</h3>
                            </div>
                        </div>
                        <div className="box" id="box8" onClick={()=>{navigate('/category/:mens-watches')}}>
                            <div className="overlay4">
                                <h3>Mens-Watches</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <SpecialOffer/>
                <div className='badges'>
                    <div className='badge'>
                        <i className="fa-solid fa-truck-fast"></i>
                        <p><b>Free Shipping</b></p>
                    </div>
                    <div className='badge'>
                        <i className="fa-solid fa-building-lock"></i>
                        <p><b>Secure<br></br> Payment</b></p>
                    </div>
                    <div className='badge'>
                        <i className="fa-solid fa-phone"></i>
                        <p><b>24/7 Support</b></p>
                    </div>
                </div>
            </div>
    

        </>
    )
}
export default Home;