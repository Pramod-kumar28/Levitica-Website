// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  authChecked: false,
  error: null,
  lastRefreshed: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user } = action.payload;
  
      state.user = user;
      state.isAuthenticated = true;
      state.authChecked = true;
      state.loading = false;
      state.error = null;
      state.lastRefreshed = Date.now();
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.authChecked = true;
      state.error = null;
      state.lastRefreshed = null;
    },

    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },

    // 👇 ADD THIS ACTION for token refresh
    tokenRefreshed: (state) => {
      state.lastRefreshed = Date.now();
      state.error = null; // Clear any previous errors
    },

    // Optional: Add token update action if needed
    updateToken: (state, action) => {
      state.token = action.payload;
      state.lastRefreshed = Date.now();
    },

    // Optional: Clear auth errors
    clearError: (state) => {
      state.error = null;
    },
  },


});

// 👇 UPDATE EXPORTS to include the new actions
export const {
  login,
  logout,
  tokenRefreshed,
  updateToken,
  clearError,
  setAuthChecked
} = authSlice.actions;

export default authSlice.reducer;