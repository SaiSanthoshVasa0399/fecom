import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { urlFor } from '../sanity/client';

const SimilarProduct = ({ product }) => {
    debugger
  const { image, slug } = product;
  console.log('product -->', product);
  return (
    <div>
      <Link to={`/product/${slug}`}>
        <div className="product-card">
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt={'img'}
            width={250}
            height={250}
            className="product-image"
          />
        </div>
      </Link>
    </div>
  );
};

export default SimilarProduct;
