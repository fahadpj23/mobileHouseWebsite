import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slice/productSlice";
import { BannerReducer } from "./slice/bannerSlice";
import { justLaunchedReducer } from "./slice/justLaunchedSlice";
import { newArrivalReducer } from "./slice/newArrivalSlice";
import { whatsappAdsReducer } from "./slice/whatsappAdsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage for persistence

// Persist config: specifies which parts of the state to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  products: productReducer,
  banner: BannerReducer,
  justLaunched: justLaunchedReducer,
  newArrival: newArrivalReducer,
  whatsappAds: whatsappAdsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creating the Redux store
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
