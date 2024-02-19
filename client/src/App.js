import logo from './logo.svg';
import './App.css';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Loading from './components/Loading';
import React, { useState, useEffect } from 'react';
import { client } from './sanity/client';
import Product from './components/Product';
function App() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = "login";
            return
        }
      try {
        const query = '*[_type == "product"]';
        const producData = await client.fetch(query);
        const bannerQuery = '*[_type == "banner"]';
        const bannerData = await client.fetch(bannerQuery);
        // console.log(producData);
        console.log(bannerData);
        setProducts(producData);
        setBanners(bannerData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); 
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="App">
          <Hero banner={banners[0]}></Hero>
          <div className="products-heading">
            <h2>Discover the Latest Trends</h2>
            <p>Explore our curated selection</p>
          </div>
          <div className="products-container">
            {products?.map((product) => <Product key={product._id} product={product}></Product>)}
          </div>
        </div>
      )}
    </>
  );
}
export default App;
