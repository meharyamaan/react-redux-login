import { createSlice } from "@reduxjs/toolkit";

// Initial state
const intial = {
  name: "",
};
// Create sslice
const authSlice = createSlice({
  name: "auth",
  initialState: intial,
  reducers: {
    setInfo: (state, action) => {
      state.name = action.payload;
    },

    logout: (state, action) => {
      state.name = "";
    },
  },
});
// Export actions
export const { setInfo, logout } = authSlice.actions;
// Export reducer to be included in the store
export default authSlice.reducer;
