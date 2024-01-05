import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: null,
    username: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value.id = action.payload.id;
      state.value.username = action.payload.username;
    },
    removeUserFromStore: (state, action) => {
      state.value.id = null;
      state.value.username = null;
    },
  },
});

export const { addUserToStore, removeUserFromStore } = userSlice.actions;
export default userSlice.reducer;
