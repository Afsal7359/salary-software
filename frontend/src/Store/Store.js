// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import adminauthReducer from './Adminauth';


const store = configureStore({
  reducer: {
    auth: authReducer,
    admin:adminauthReducer
    // Add other reducers if needed
  },
});

export default store;
