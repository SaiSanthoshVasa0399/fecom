import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer-container">
      <p>Fashion Ecom. All rights reserved. &copy; {currentYear}</p>
      Follow us on:
      <p className="icons">
        
        <a href="https://www.instagram.com/fashionecom">
          <AiFillInstagram />
        </a>
        <a href="https://twitter.com/fashionecom">
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  );
};

export default Footer;
