import React from 'react';
import Cart from './Cart';
import { useStateContext } from '../context';
import { Outlet, Link } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link to="/">Fashion Ecom.</Link>
      </p>
      <div className="navbar-container">
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        <Link to="/profile">
          <button
            style={{ marginLeft: '16px' }}
            type="button"
            className="logout-icon"
          
          >
            <FaUser></FaUser>
          </button>
        </Link>
        <Link to="/logout">
        <button
          style={{ marginLeft: '16px' }}
          type="button"
          className="logout-icon"
          
        >
          <FaSignOutAlt></FaSignOutAlt>
        </button>
        </Link>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
