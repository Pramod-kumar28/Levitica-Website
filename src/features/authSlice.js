// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  stats: null,
  loading: false,
  error: null,
  lastRefreshed: null, // 👈 Track token refresh time
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('Login action payload:', action.payload);
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated=true
      state.loading = false;
      state.error = null;
      state.lastRefreshed = Date.now();
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.stats = null;
      state.loading = false;
      state.error = null;
      state.lastRefreshed = null;
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

  extraReducers: (builder) => {
    builder
      .addCase('auth/login/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('auth/login/fulfilled', (state, action) => {
        const { user, token, stats } = action.payload;
        state.user = user;
        state.token = token;
        state.stats = user?.role === 'admin' ? stats || null : null;
        state.loading = false;
        state.error = null;
        state.lastRefreshed = Date.now();
      })
      .addCase('auth/login/rejected', (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.stats = null;
        state.lastRefreshed = null;
        state.error = action.error?.message || 'Login failed';
      });
  },
});

// 👇 UPDATE EXPORTS to include the new actions
export const { 
  login, 
  logout, 
  tokenRefreshed, // 👈 Add this
  updateToken,    // 👈 Optional
  clearError      // 👈 Optional
} = authSlice.actions;

export default authSlice.reducer;