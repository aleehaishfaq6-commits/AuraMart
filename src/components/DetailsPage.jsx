import { useState } from 'react';
import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import cartContext from '../contextApi/cart/cartContext';
import SpinnerPage from './SpinnerPage';
const DetailsPage =()=>{
  const context = useContext(cartContext);
  const {cart, setcart,loading,setloading,addtoCart,increment,decrement} = context;
    const {id} =useParams();
    let [products,setproducts]=useState(null);
    let [Relevant, setRelevant]=useState([]);
    let navigate=useNavigate()
    // fetch product details by id
  useEffect(()=>{
    setloading(true)
    let fetchbyid=async()=>{
    // let url =`https://dummyjson.com/products/${id}`
    let response = await fetch(`/https://dummyjson.com/products/${id}`);
    setloading(false)
    let data = await response.json()
    setproducts(data)
    console.log(data)
    }
    fetchbyid()
  },[id])
//   fetch relevant products
  useEffect(()=>{
   const fetchrelevant=async()=>{
     if (!products?.category)
        return;
      setloading(true)
    let url = `/https://dummyjson.com/products/category/${products.category}`
    let response = await fetch(url);
    setloading(false)
    let data = await response.json();
    let filtered = data.products.filter((item)=>{
       return item.id!==products.id;
    })
    setRelevant(filtered.slice(0,6));
   }
   fetchrelevant();
  },[products])
  const [selectedImage, setSelectedImage] = useState(0);
  //  rating stars 

const renderStars=(rating)=>{
    let stars=[];
    let rates = Math.round(rating);
    for(let i=1;i<5;i++){
    if(i<=rates){
        stars.push(<p key={`star_${i}`} style={{color:'orange',
            fontSize:'18px'}}>★</p>)
    }
    else{
        stars.push(<p key={i} style={{color:'#E5E7EB'}}>★</p>)
    }
}
return stars;
}
const isAdded = cart.some((item)=>{
   return item.id === Number(id)
})
return(
    <>
    {loading && <SpinnerPage/>}
    {!loading && products && 
    <div className='sides'>
    <div className='leftside'>
    <div className='main-image'>
        <img src={products.images?products.images[selectedImage]:''}/>
    </div>
    <div className='image-options'>
        {products.images?products.images.map((image,index)=>{
          return(<div className={
                `image-option
             ${index === selectedImage?'active':''}
             `} key={index} onClick={()=>setSelectedImage(index)}>
                <img src={image}/>
            </div>);
        }):''}
    </div>
    
    </div>
      <div className='rightside'>
         <h2>{products.title}</h2>
    <p id='dess'>{products.description}</p>
          <div id='rating1'> 
             {products.rating.toFixed(1)}
             {renderStars(products.rating)}
             </div>
             <div className='pd'>
    <p id='dis'>-{Math.round(products.discountPercentage)}%</p>
    <p id='prc'>{products.price}$</p>
    </div>
    <p id='rp'>Return Policy:<span id='ans'>{products.returnPolicy}</span></p>
    <p id='rp'>Shipping:<span id='ans'>{products.shippingInformation}</span></p>
    <p id='war'>Warranty:<span id='ans'>{products.warrantyInformation}</span></p>
    <div className='detail'>
        <h2>Product Details</h2>
        <table className="details-table">
  <tbody>
    <tr>
      <td className="label">Available:</td>
      <td className="value">{products.availabilityStatus}</td>
    </tr>
    <tr>
      <td className="label">Brand:</td>
      <td className="value">{products.brand}</td>
    </tr>
    <tr>
      <td className="label">Category:</td>
      <td className="value">{products.category}</td>
    </tr>
    <tr>
      <td className="label">Tags:</td>
      <td className="value">{products.tags?.[1]}</td>
    </tr>
    <tr>
      <td className="label">Minimum Order Quantity:</td>
      <td className="value">{products.minimumOrderQuantity}</td>
    </tr>
  </tbody>
</table>
</div>
<button type='button' id='cartbtn1' disabled={isAdded} onClick={()=>{addtoCart(products)}}>{isAdded?"Added to cart":"Add to Cart"}</button>
 <div id='qq'>
  <p>Quantity</p>
     <button type='button' id='inc' onClick={() => { increment(products.id) }}>+</button>
         <p id="count">
         {cart.find((cartitem) => cartitem.id === products.id)?.quantity || 0}
          </p>
          <button type='button' id='dec' onClick={()=>{decrement(products.id)}}>-</button>
          </div>
        <button type='button' id='cartbtn2'>Buy Now</button>
          <section className="reviews-section">
        <h2>Customer Reviews</h2>

        <div className="reviews-summary">
          <div className="rating-box">
            <h1>{products.rating.toFixed(1)}</h1>

            <div className="stars">
              {"★★★★★"}
            </div>

            <p>Based on {products.reviews.length} reviews</p>
          </div>

          <div className="rating-message">
            <h3>What customers are saying</h3>
            <p>
              See what customers think about this products.
            </p>
          </div>
        </div>

        <div className="reviews-list">
          {products.reviews.length > 0 ? (
            products.reviews.map((review, index) => (
              <div className="review-card" key={index}>

                <div className="review-header">
                  <div className="review-user">
                    <div className="user-avatar">
                      {review.reviewerName.charAt(0)}
                    </div>

                    <div>
                      <h4>{review.reviewerName}</h4>

                      <div className="review-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= review.rating
                                ? "active-star"
                                : "inactive-star"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="review-date">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>

                <p className="review-comment">
                  {review.comment}
                </p>

              </div>
            ))
          ) : (
            <p>No reviews available for this products.</p>
          )}
        </div>
      </section>
      {loading && <SpinnerPage/>}
      <div className='relevant'>
                 <section className="relevant-section">
                <h2>You May Also Like</h2>

               <div className="relevant-products">
          {!loading && Relevant.map((item) => (
        <div className="relevant-card" key={item.id}>
        <img src={item.thumbnail} alt={item.title} />
        <h3>{item.title}</h3>
        <p id='rel'>${item.price}</p>
        <button id='view' type='submit'
          onClick={() => navigate(`/DetailsPage/${item.id}`)}>
          View Product
          </button>
          </div>
    ))}
  </div>
</section>
      </div>
    
      </div>
      </div>
   }

    </>
)
}
export default DetailsPage;