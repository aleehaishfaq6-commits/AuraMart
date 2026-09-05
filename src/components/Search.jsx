import React, { useEffect } from "react";
import cartContext from "../contextApi/cart/cartContext";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SpinnerPage from "./SpinnerPage";
const Search = () => {
    let navigate=useNavigate();
    let { fword } = useParams();
    let context = useContext(cartContext);
    let { cart, setcart ,increment,decrement,removecart,loading,setloading} = context;
    let [products, setproducts] = useState([]);
    const fetchsearch = async () => {
      setloading(true);
        if (!fword) {
            return;
        }
        try {
            let url = `/api/products/search?q=${encodeURIComponent(fword)}`
            let data = await fetch(url);
            setloading(false)
            console.log('fetching fword:', fword)
            let response = await data.json();
            console.log(response.products)
            setproducts(response.products)
        }
        catch (err) {
            console.log('error fetching search item', err)
        }
    }
    useEffect(() => {
        fetchsearch();
    }, [fword])
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
    // stars 
     const renderStars = (rating) => {
        let stars = [];
        let rates = Math.round(rating);
        for (let i = 1; i < 5; i++) {
            if (i <= rates) {
                stars.push(<p key={`star_${i}`} style={{
                    color: 'orange',
                    fontSize: '18px'
                }}>★</p>)
            }
            else {
                stars.push(<p key={i} style={{ color: '#E5E7EB' }}>★</p>)
            }
        }
        return stars;
    }
    return (
        <>
            <div className="search-box">
              {loading && <SpinnerPage/>}
              {products.length > 0 && !loading ? (
              products.map((item) => {
    const isAdded = cart.some(
      (cartitem) => cartitem.id === item.id
    );

    return (
      <div className="search-item" key={item.id}>
        <img
          src={item.images[0]}
          alt={item.title}
          onClick={() => {
            navigate(`/DetailsPage/${item.id}`);
          }}
        />

        <h5 id="name">{item.title}</h5>

        <div id="rating">
          {item.rating.toFixed(1)}
          {renderStars(item.rating)}
        </div>

        <p id="price">
          <b>{Math.round(item.price)}$</b>
        </p>

        <p id="discount">
          {Math.round(item.discountPercentage)}% Off
        </p>

        <div id="add">
          <button
            type="button"
            id="cartbtn1"
            disabled={isAdded}
            onClick={() => addtoCart(item)}
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>

        <div id="qq">
          <button
            type="button"
            id="inc"
            onClick={() => increment(item.id)}
          >
            +
          </button>

          <p id="count">
            {cart.find((cartitem) => cartitem.id === item.id)?.quantity || 0}
          </p>

          <button
            type="button"
            id="dec"
            onClick={() => decrement(item.id)}
          >
            -
          </button>
        </div>

        <button
          type="button"
          id="remove"
          onClick={() => removecart(item.id)}
        >
          Remove
        </button>
      </div>
    );
  })
) : (
  <p style={{textAlign:'center',
             width:"100%",
            minHeight:'50vh',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
  }}>No products found</p>
)}
            </div>
        </>
    )
}
export default Search;