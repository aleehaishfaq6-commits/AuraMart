
import { useState, useEffect, useContext } from "react";
import { Filter } from "lucide-react";
import { Tags } from "lucide-react";
import SpinnerPage from "./SpinnerPage";
import { useNavigate } from "react-router-dom";
import cartContext from "../contextApi/cart/cartContext";
import { Menu, X } from 'lucide-react';

const Shop = () => {
  const navigate = useNavigate();
  const context = useContext(cartContext);
  const {
    cart,
    increment,
    decrement,
    removecart,
    loading,
    setloading,
    addtoCart,
  } = context;
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [selected, setSelected] = useState("");
   const [isOpen, setIsOpen] = useState(false);
 const toggleFilter = () => {
        setIsOpen((prev) => !prev);
    };
  // ALL PRODUCTS FETCH
  useEffect(() => {
    const fetchshop = async () => {
      try {
        setloading(true);

        const data = await fetch("/https://dummyjson.com/products");

        if (!data.ok) {
          throw new Error(`Products Error: ${data.status}`);
        }

        const response = await data.json();

        setproducts(
          Array.isArray(response.products)
            ? response.products
            : []
        );

      } catch (error) {
        console.error(error.message);
        setproducts([]);
      } finally {
        setloading(false);
      }
    };

    fetchshop();
  }, []);

  // NAVIGATE CATEGORY
  useEffect(() => {
    if (selected) {
      navigate(`/category/${selected}`);
    }
  }, [selected, navigate]);

  // ALL CATEGORIES FETCH
  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const data = await fetch("/https://dummyjson.com/products/categories");

        if (!data.ok) {
          throw new Error(`Categories Error: ${data.status}`);
        }

        const response = await data.json();

        console.log("Categories response:", response);

        setcategories(
          Array.isArray(response)
            ? response.slice(0,15)
            : []
        );

      } catch (error) {
        console.error(error.message);
        setcategories([]);
      }
    };

    fetchcategory();
  }, []);

  // RENDER STARS
  const renderStars = (rating) => {
    const stars = [];
    const rates = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <p
          key={`star_${i}`}
          style={{
            color: i <= rates ? "orange" : "#E5E7EB",
            fontSize: "18px",
          }}
        >
          ★
        </p>
      );
    }
    return stars;
  };

  return (
    <>
    <div>
      <h1 style={{textAlign:'center',marginTop:'30px'}} id='shopshop'>Explore Our Collection</h1>
      <button className="cat-toggle-btn" onClick={toggleFilter}>
    <Tags size={20} />
</button>

    </div>
      {loading ? (
        <SpinnerPage />
      ) : (

        <div className="shop-container">
        
          <div className={`shop-filters ${isOpen ? 'active' : ''}`}>
            <h3>Categories</h3>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <div id="shopBrand" key={category.slug}>
                  <input
                    type="checkbox"
                    value={category.slug}
                    checked={selected === category.slug}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelected(category.slug)
                        : setSelected("")
                    }
                  />
                  <p>{category.name}</p>
                </div>
              ))}
          </div>
          <div className="shopp">
            {products.map((item) => {
              const isAdded = cart.some(
                (cartitem) => cartitem.id === item.id
              );

              return (
                <div className="cat" key={item.id}>

                  <img
                    src={item.images?.[0]}
                    id="catimg"
                    alt={item.title}
                    onClick={() => {
                      navigate(`/DetailsPage/${item.id}`);
                    }}
                  />

                  <h5 id="name">{item.title}</h5>

                  <div id="rating">
                    {Number(item.rating).toFixed(1)}
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
                      {isAdded
                        ? "Added to Cart"
                        : "Add to Cart"}
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
                      {cart.find(
                        (cartitem) =>
                          cartitem.id === item.id
                      )?.quantity || 0}
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
            })}
          </div>

        </div>
      )}
    </>
  );
};

export default Shop;