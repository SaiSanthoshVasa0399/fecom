import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { urlFor } from '../sanity/client';

const Hero = ({ banner }) => {
  const { smallText, midText, largeText1, image, buttonText, product, desc } = banner;

  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img src={urlFor(image)} alt='hero-img' className='hero-banner-image'></img>
      </div>
      <div>
        <Link to={`/product/${product}`}>
          <button type='button'>{buttonText}</button>
        </Link>
        <div className='desc'>
          <h5>{desc}</h5>
          <p>Elevate your look.</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
