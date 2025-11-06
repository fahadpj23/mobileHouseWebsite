import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slice/productSlice";
import { BannerReducer } from "./slice/bannerSlice";
import { upcomingReducer } from "./slice/upcomingSlice";
import { newArrivalReducer } from "./slice/newArrivalSlice";
import { whatsappAdsReducer } from "./slice/whatsappAdsSlice";
import { seriesReducer } from "./slice/seriesSlice";
import { authReducer } from "./slice/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage for persistence
import { customerOrderReducer } from "./slice/customerOrderSlice";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  products: productReducer,
  banner: BannerReducer,
  upcoming: upcomingReducer,
  newArrival: newArrivalReducer,
  whatsappAds: whatsappAdsReducer,
  series: seriesReducer,
  customerOrder: customerOrderReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: [
          "user.products.entities",
          "user.products.entity",
          "user.products.items", // add if you store Firestore docs directly
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
