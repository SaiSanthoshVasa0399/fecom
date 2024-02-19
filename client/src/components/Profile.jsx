import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { FaSignOutAlt, FaHome } from 'react-icons/fa';
import { Outlet, Link } from 'react-router-dom';

import { PY_SERVER_BASE_URL } from '../constants';

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(PY_SERVER_BASE_URL + '/api/user/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } else {
          window.location.href = 'login';
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        alert('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <div className="navbar-container">
        <p className="logo">
          <Link to="/">Fashion Ecom.</Link>
        </p>
        <div>
          <Link to="/">
            <button
              type="button"
              className="home-icon"
              style={{ marginLeft: '16px' }}
            >
              <FaHome></FaHome>
            </button>
          </Link>
          <Link to="/logout">
            <button
              type="button"
              className="logout-icon"
              style={{ marginLeft: '16px' }}
            >
              <FaSignOutAlt></FaSignOutAlt>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-md rounded-md overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center mb-6">
              <FaUser className="text-6xl text-gray-600" />
            </div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              User Profile
            </h2>
            {userData && (
              <div className="mt-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <p className="text-lg font-semibold text-gray-900">
                    Username:
                  </p>
                  <p className="text-sm text-gray-700">{userData.username}</p>
                </div>
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <p className="text-lg font-semibold text-gray-900">Email:</p>
                  <p className="text-sm text-gray-700">{userData.email}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Full Name:
                  </p>
                  <p className="text-sm text-gray-700">{userData.full_name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
