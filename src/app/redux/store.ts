"use client";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import remoteReducer from "./feature/remoteSlice/remoteSlice";

// Persist config for all reducers (you can customize per reducer if needed)
const persistConfig = {
  key: "root",
  storage,
};

// Persist each reducer individually
const persistedRemoteReducer = persistReducer(persistConfig, remoteReducer);

// Configure the store with persisted reducers
const store = configureStore({
  reducer: {
    remote: persistedRemoteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
const persistor = persistStore(store);

// TypeScript types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
