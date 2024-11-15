import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import LoaderReducer from "./loader/loaderSLice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    loader: LoaderReducer,
  },
});
export const persistor = persistStore(store);
export default store;
