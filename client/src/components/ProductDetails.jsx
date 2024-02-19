import React , {useState, useEffect} from 'react'
import { useLoaderData } from "react-router-dom";
import { urlFor } from '../sanity/client';
import { useStateContext } from '../context';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Product from './Product';
import Loading from './Loading';
import ErrorPage from './ErrorPage';
import {PY_SERVER_BASE_URL} from "../constants"
import axios from 'axios';
import SimilarProduct from './SimilarProduct';
const ProductDetails = () => {
    debugger
    const { productItem, products } = useLoaderData();
    const [similarProducts, setSimilarProducts] = useState([]);
    console.log("products-->", products)
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
    useEffect(() => {

      const fetchSimilarProducts = async () => {
        try {
          const response = await axios.get( PY_SERVER_BASE_URL + `/api/similar-products/${productItem.slug.current}`);
          setSimilarProducts(response.data);
        } catch (error) {
          console.error('Error fetching similar products:', error);
        }
      };
      fetchSimilarProducts();
     }, []);
    if(! productItem){
        return (<ErrorPage></ErrorPage>)
    }
    const { image, name, details, price } = productItem;
   
    console.log(productItem)
    const handleBuyNow = () => {
        onAdd(productItem, qty);
    
        setShowCart(true);
      }
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
          
            <p>
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(productItem, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>Similar Products</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {similarProducts?.map((item) => (
                <SimilarProduct key={item.slug} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProductDetails