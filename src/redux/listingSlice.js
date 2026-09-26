import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  litterDetails: {},
  petsDetails: [],
  ownerDetails: {},
  ownerType: null,
};

const listingSLice = createSlice({
  name: "listing",

  initialState,

  reducers: {
    setLitterDetails: (state, action) => {
      state.litterDetails = action.payload;
    },
    setPetsDetails: (state, action) => {
      state.petsDetails = action.payload;
    },
    setOwnerDetails: (state, action) => {
      state.ownerDetails = action.payload;
    },
    setOwnerType: (state, action) => {
      state.ownerType = action.payload;
    },

    clearListing: (state) => {
      state.litterDetails = {};
      state.petsDetails = [];
      state.ownerDetails = {};
      state.ownerType = null;
    },
    setSelectedListingType: (state, action) => {
      state.selectedListingType = action.payload;
    },
  },
});

export const {
  setLitterDetails,
  setPetsDetails,
  setOwnerDetails,
  setOwnerType,
  clearListing,
  setSelectedListingType,
} = listingSLice.actions;

export default listingSLice.reducer;
