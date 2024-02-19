import React from 'react'
import { Outlet, Link } from "react-router-dom";
import {urlFor} from '../sanity/client' 

const Product = ({ product }) => {
    const { image, name, slug, price } = product;
    console.log("product -->",product)
    return (
        <div>
          <Link to={`/product/${slug.current}`}>
            <div className="product-card">
              <img 
                src={urlFor(image && image[0])}
                width={250}
                height={250}
                className="product-image"
              />
              <p className="product-name">{name}</p>
              <p className="product-price">${price}</p>
            </div>
          </Link>
        </div>
      )
}

export default Product