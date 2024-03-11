import { createSlice } from '@reduxjs/toolkit';

// Get the initial token value from localStorage
const storedToken = localStorage.getItem('admintoken');

const Adminslice = createSlice({
  name: 'adminauth',
  initialState: {
    isLoggedIn: !!storedToken,
    admintoken: storedToken,
  },
  reducers: {
    adminlogin: (state, action) => {
      state.isLoggedIn = true;
      state.admintoken = action.payload;
      localStorage.setItem('admintoken', action.payload); 
    },
    adminlogout: (state) => {
      state.isLoggedIn = false;
      state.admintoken = null;
      localStorage.removeItem('admintoken');
    },
  },
});

// export const { login, logout } = Adminauth.actions;
// export const selectAdminAuth = (state) => state.adminauth;
// export default Adminauth.reducer;

export const {adminlogin, adminlogout} = Adminslice.actions;
export default Adminslice.reducer;
