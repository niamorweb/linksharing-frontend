import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    links: [],
    firstName: null,
    lastName: null,
    email: null,
    image: null,
  },
};

export const linksSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    addLinksToStore: (state, action) => {
      state.value.links = action.payload;
    },
    addLinkToStore: (state, action) => {
      state.value.links = action.payload.allLinksInfo;
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
      state.value.email = action.payload.email;
      state.value.image = action.payload.image;
    },
  },
});

export const { addLinkToStore } = linksSlice.actions;
export default linksSlice.reducer;
