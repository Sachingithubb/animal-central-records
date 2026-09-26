import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./listingSlice";
import individualReducer from "./individualSlice";

export const store = configureStore({
  reducer: {
    listing: listingReducer,
    individual: individualReducer,
  },
});