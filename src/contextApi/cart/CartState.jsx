import { useState } from "react";
import { useContext } from "react";
import cartContext from "./cartContext";
const CartState = (props)=>{
  
    let [cart, setcart] = useState(()=>{
        let saved = localStorage.getItem("cart")
        return saved ?JSON.parse(saved):[]
 })
 let [loading,setloading] = useState(true);
  // *****************increment button***************************
    const increment = (id) => {
        setcart((prevCart) => {
            let updatedCart = prevCart.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart;
        })

    }
    // **********************decrement**********************************
    const decrement = (id) => {
        setcart((prevCart) => {
            let updatedCart = prevCart.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: Math.max(1,item.quantity - 1)
                    }
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart;
        })

    }
    // *********************remove button*******************************
    const removecart=(id)=>{
        setcart((prevCart)=>{
            let updated = prevCart.filter((item)=>{
                return item.id !== id;
            })
            localStorage.setItem('cart',JSON.stringify(updated))
            return updated;
        })
    }
    // add to cart
     const addtoCart = (item) => {
        setcart((prevCart) => {
            let alreadyexist = prevCart.some((cartitem) =>
                cartitem.id === item.id)

            if (alreadyexist) {
                return prevCart;
            }
            let updated = [
                ...prevCart, {
                    ...item,
                    quantity: 1
                }
            ];
            localStorage.setItem('cart', JSON.stringify(updated))
            return updated;
        })

    }
 return(
    <cartContext.Provider value={{cart,setcart,increment,decrement,removecart,loading,setloading,addtoCart}}>
        {props.children}
    </cartContext.Provider>
 )
}
export default CartState;