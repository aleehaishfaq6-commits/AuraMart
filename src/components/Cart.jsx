import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import cartContext from '../contextApi/cart/cartContext'
const Cart = () => {
   let context = useContext(cartContext);
   let [total,setTotal]=useState(0)
    const { cart, setcart, increment,decrement,removecart } = context
    useEffect(()=>{
     const updateTotal =()=>{
        let count=0;
      for(let i=0;i<cart.length;i++){
         count+=cart[i].price*cart[i].quantity
      }
      setTotal(count.toFixed(2))
    }
    updateTotal()
    },[cart])
   
    return (
        <div className='cart-container'>
            <h1 style={{textAlign:'center',
                marginTop:'20px'
            }}>{cart.length>0?"Your Cart":"Cart is Empty"}</h1>
            {cart.map((item) => {
                return (
                    <div className='cart-item'>
                        <img src={item.images[0]} />
                        <p id='cart-title'>{item.title}</p>
                         <p id='price1'>Price: {item.price}$</p>
                        <div id='qq'>
                            <button type='button' id='inc' onClick={() => { increment(item.id) }}>+</button>
                            <p id="count">
                                {cart.find((cartitem) => cartitem.id === item.id)?.quantity || 0}
                            </p>
                            <button type='button' id='dec' onClick={() => { decrement(item.id) }}>-</button>
                             <button type='button' id='remove-cart' onClick={() => { removecart(item.id) }}>Remove</button>
                        </div>
                        <p id='cart-price'>SubTotal:   {(item.price*item.quantity).toFixed(2)}$</p>
                    </div>
                )
            })}
          <p id='Totalprice'>Total: {total}$</p>
        </div>
    );
}
export default Cart;