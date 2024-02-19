import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Outlet, Link } from 'react-router-dom';
function LogoutPage() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log('Logging out...');
    window.location.href = "login";
  };

  return (
    <>
      <div className="navbar-container">
        <p className="logo">
          <Link to="/">Fashion Ecom.</Link>
        </p>
        </div>
    <div className="flex min-h-full items-center justify-center">
      <div className="max-w-md bg-white shadow-md rounded-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Logout Confirm</h2>
          <p className="text-gray-700 text-lg text-center mb-8">Thank you for using Fashionecom.</p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>
            <FiLogOut className="inline-block mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default LogoutPage;
