import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import Layout from './components/Layout';
import { StateContext } from './context';
import ProductDetails from './components/ProductDetails';
import {
  productItemLoader,
} from "./routes/productItem";
import LoginPage from './components/Login';
import ProfilePage from './components/Profile';
import RegisterPage from './components/Register';
import LogoutPage from './components/Logout';
import OrderSuccessPage from './components/OrderSucces';
import PaymentCancelledPage from './components/paymentCancelled';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App></App></Layout>,
    errorElement: <ErrorPage />
  },
  {
    path: "/product/:productId",
    element: <Layout><ProductDetails></ProductDetails></Layout>,
    errorElement: <ErrorPage />,
    loader: productItemLoader,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
    errorElement: <ErrorPage />,
   
  }
  ,{
    path: "/profile",
    element: <ProfilePage></ProfilePage>,
    errorElement: <ErrorPage />,
   
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
    errorElement: <ErrorPage />,
    
  },
  {
    path: "/logout",
    element: <LogoutPage></LogoutPage>,
    errorElement: <ErrorPage />,
    
  }, {
    path: "/success",
    element: <OrderSuccessPage></OrderSuccessPage>,
    errorElement: <ErrorPage />,
    
  },
  {
    path: "/failed",
    element: <PaymentCancelledPage></PaymentCancelledPage>,
    errorElement: <ErrorPage />,
    
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateContext>
    <RouterProvider router={router} />
    </StateContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
