// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../Store/AuthSlice';

const PrivateRoute = ({ element, ...props }) => {
  const { isLoggedIn } = useSelector(selectAuth);

  return isLoggedIn ? (
    <Routes>
      <Route {...props} element={element} />
    </Routes>
  
  ) : (
    <Navigate to="/superadmin-login" replace />
  );
};

export default PrivateRoute;
