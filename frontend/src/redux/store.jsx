import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import LoaderReducer from "./loader/loaderSLice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: LoaderReducer,
  },
});
export default store;
