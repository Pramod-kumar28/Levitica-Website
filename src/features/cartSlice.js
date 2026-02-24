// features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item._id !== action.payload
      );

    

     
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item._id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i._id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const {
  setCartItems,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  setLoading,
  setError,
  clearCart
} = cartSlice.actions;

export const selectCartItems = state => state.cart.items;
export const selectCartTotal = state => {
  return state.cart.items.reduce((sum, item) => {
    return sum + (item.price * 1);
  }, 0);
};

export const selectCartCount = state =>
  state.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

export const selectCartLoading = state => state.cart.loading;
export const selectCartError = state => state.cart.error;

export default cartSlice.reducer;