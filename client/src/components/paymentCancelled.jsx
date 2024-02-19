import React from 'react';
import { Outlet, Link } from 'react-router-dom';
function PaymentCancelledPage() {
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
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Payment Cancelled</h2>
          <p className="text-gray-700 text-lg text-center mb-8">Your payment was cancelled.</p>
          <Link to="/">
          <button className="btn text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back
          </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

export default PaymentCancelledPage;
