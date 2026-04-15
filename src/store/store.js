import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from '@/Services/api';

import authSliceReducer from '@/features/authSlice';
import cartSliceReducer from '@/features/cartSlice';
import { cartPersistMiddleware } from '@/middleware/cartPersistMiddleware';
import rtkLogger from "./rtkLogger";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    cart: cartSliceReducer,
    [api.reducerPath]: api.reducer, // ✅ single RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,               // ✅ single RTK Query middleware
      cartPersistMiddleware,
      rtkLogger
    ),
  devTools: import.meta.env.VITE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;