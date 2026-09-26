import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  petDetails: {
    microchipNumber: "",
    CARtag: "",
    petName: "",
    implantDate: "",
    dob: "",
    breed: "",
    xBreed: "",
    species: "",
    sex: "",
    colors: [""],
    sourceNumber: "",
    implanterNumber: "",
    breederSupplyNumber: "",
    breederSupplyNotRequired: false,
  },

  ownerDetails: {},

  isEditMode: false,
};

const individualSlice = createSlice({
  name: "individual",
  initialState,
  reducers: {
    setIndividualPetDetails: (state, action) => {
      state.petDetails = {
        ...state.petDetails,
        ...action.payload,
      };
    },

    setIndividualOwnerDetails: (state, action) => {
      state.ownerDetails = {
        ...state.ownerDetails,
        ...action.payload,
      };
    },

    setIndividualEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },

    resetIndividual: () => initialState,
  },
});

export const {
  setIndividualPetDetails,
  setIndividualOwnerDetails,
  setIndividualEditMode,
  resetIndividual,
} = individualSlice.actions;

export default individualSlice.reducer;
