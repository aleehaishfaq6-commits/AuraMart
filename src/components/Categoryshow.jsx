import React, { useEffect } from "react";
import { Menu, X } from 'lucide-react';
import { Filter } from "lucide-react";
import { useParams } from "react-router-dom";
import SpinnerPage from "./SpinnerPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartContext from "../contextApi/cart/cartContext";
import DetailsPage from './DetailsPage'
import { useContext } from "react";
const Categoryshow = () => {
    let { catname } = useParams()
    const [catproducts, setcatproducts] = useState([])
    let [selectedbrand, setselectedbrand] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    let { quantity, setQuantity } = useState(0)
    const cleanedCatName = catname.startsWith(":") ? catname.slice(1) : catname;
    let context = useContext(cartContext);
    const { cart, setcart, increment, decrement, removecart, loading, setloading, addtoCart } = context
    useEffect(() => {
        if (!catname) {
            return;
        }
        const fetchcategory = async () => {
            try {
                let url = `{
                     https://dummyjson.com/products/category/${cleanedCatName}`;
                let response = await fetch(url);
                let data = await response.json()
                setloading(false)
                setcatproducts(data.products)
                console.log("fetching...")
                console.log(data.products)
            }
            catch (error) {
                console.log(error.message)
            }
        }
        fetchcategory()
    }, [catname])

    let uniquebrands = [
        ...new Set(catproducts ? catproducts.map((item) =>
            item.brand).filter((brand) => brand) : '')];
    // checkbox check/uncheck logic
    let brandchange = (brand) => {
        if (selectedbrand.includes(brand)) {
            setselectedbrand(selectedbrand.filter((item) => {
                item !== brand;
            }))
        }
        else {
            setselectedbrand([...selectedbrand, brand])
        }
    }

    // price filter
    let [Pricefilter, setPricefilter] = useState(0)

    // filtered products according to selected brand
    const filterdProducts =
        selectedbrand.length === 0 ? catproducts :
            catproducts.filter((item) =>
                selectedbrand.includes(item.brand));
    // filtered products according to price
    const filteredbyprice =
        Pricefilter > 0 ?
            filterdProducts.filter((item) => {
                return item.price < Pricefilter;
            }) : filterdProducts;
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    //  rating stars 

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
    const toggleFilter = () => {
        setIsOpen((prev) => !prev);
    };
    let navigate = useNavigate()

    return (
        <>
            <div className="body">
                <h1 id='head'>{capitalize(cleanedCatName)}</h1>
               <button
            className="filter-toggle-btn"
          onClick={toggleFilter}
           >
  {isOpen ? <X size={20} /> : <Filter size={20} />}
  <span>Filter</span>
</button>
                <div className="main">
                    <div className={`filters ${isOpen ? 'active' : ''}`}>
                        <h2 id='h2'>Filter By</h2>
                        {uniquebrands.length > 0 &&
                            <h3 id='h2'>Brand</h3>}
                        {uniquebrands.length > 0 && uniquebrands.map((brand) => {
                            return (
                                <div className="filter">
                                    <input type='checkbox'
                                        value={brand}
                                        checked={selectedbrand.includes(brand)}
                                        onChange={() => { brandchange(brand) }} /><p id='pf'>{brand}</p>
                                </div>)
                        })}
                        <h3 id='h2'>Price</h3>
                        <div className="ranges">
                            <div className="range">
                                <input type='checkbox'
                                    value={50} checked={Pricefilter === 50}
                                    onChange={(e) => {
                                        e.target.checked ?
                                            setPricefilter(50) : setPricefilter(0)
                                    }}
                                /><p id='pf'>Under 50$</p>
                            </div>
                            <div className="range">
                                <input type='checkbox'
                                    value={100}
                                    checked={Pricefilter === 100}
                                    onChange={(e) => {
                                        e.target.checked ?
                                            setPricefilter(100) : setPricefilter(0)
                                    }} /><p id='pf'>Under 100$</p>
                            </div>
                            <div className="range">
                                <input type='checkbox'
                                    value={500}
                                    checked={Pricefilter === 500}
                                    onChange={(e) => {
                                        e.target.checked ?
                                            setPricefilter(500) : setPricefilter(0)
                                    }} /><p id='pf'>Under 500$</p>
                            </div>
                        </div>
                    </div>

                    <div className="catproducts">
                        {loading && <SpinnerPage />}
                        {!loading && filteredbyprice?filteredbyprice.map((item) => {
                            const isAdded = cart.some((cartitem) => cartitem.id === item.id)
                            return (
                                <div className="cat" key={item.id}>
                                    <img id='catimg' src={item.images[0]} onClick={() => {
                                        navigate(`/DetailsPage/${item.id}`);
                                    }} />
                                    <h5 id='name'>{item.title}</h5>
                                    <div id='rating'>
                                        {item.rating.toFixed(1)}
                                        {renderStars(item.rating)}
                                    </div>
                                    <p id='price'><b>{Math.round(item.price)}$</b></p>
                                    <p id='discount'>{Math.round(item.discountPercentage)}% Off</p>
                                    <div id='add'>
                                        <button type='button' id='cartbtn1'
                                            disabled={isAdded} onClick={() => { addtoCart(item) }}
                                        >  {isAdded ? "Added to Cart" : "Add to Cart"}</button>
                                    </div>
                                    <div id='qq'>
                                        <button type='button' id='inc' onClick={() => { increment(item.id) }}>+</button>
                                        <p id="count">
                                            {cart.find((cartitem) => cartitem.id === item.id)?.quantity || 0}
                                        </p>
                                        <button type='button' id='dec' onClick={() => { decrement(item.id) }}>-</button>
                                    </div>
                                    <button type='button' id='remove' onClick={() => { removecart(item.id) }}>Remove</button>
                                </div>
                            )
                        }):''}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Categoryshow;