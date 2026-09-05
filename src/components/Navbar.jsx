import React from 'react'
import {Link} from 'react-router-dom'
import cartContext from '../contextApi/cart/cartContext'
import { useContext } from 'react'
import { useState } from 'react'
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
const Navbar = ()=>{
    const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
      let [fword,setfword]= useState("")
    let navigate = useNavigate();
    let context = useContext(cartContext);
    let {cart} = context;
    const onchange=(e)=>{
     setfword(e.target.value);
    }
    const handleSearch=()=>{
        navigate(`/search/${fword}`)
    }
return(
    <>
    <div className='nav'>
        <div className='logo'>
              <h1><span id='mart'>Aura</span>Mart</h1>
        </div>
      
            <ul className='list'>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/shop'>Shop</Link></li>
               <li><Link to='/cart'><i className="fa-solid fa-cart-shopping"></i></Link>
               <span id='cartSpan'>{cart.length>0?cart.length:'0'}</span></li>
            </ul>
        <div className='searchmain'>
         <input type="search" id="search" value={fword} placeholder='Search Anything' onChange={onchange}/>
           <button type='button' className='find' onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i></button>
           </div>
         <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        {/* Mobile Dropdown Menu */}
      
        <ul className={`mobile-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to='/' >Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/shop'>Shop</Link></li>
               <li><Link to='/cart'><i className="fa-solid fa-cart-shopping"></i>
              <sup id='cartSpan'>{cart.length>0?cart.length:'0'}</sup></Link></li>
        </ul>
      
    </div>
    </>
)
}
export default Navbar;