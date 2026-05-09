import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import storage from "redux-persist/lib/storage";

import { api } from "@/Services/api";

import authSliceReducer from "@/features/authSlice";
import cartSliceReducer from "@/features/cartSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSliceReducer),
  cart: cartSliceReducer,

  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage,

  whitelist: ["auth", "cart"],
};


const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;