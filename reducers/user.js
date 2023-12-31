import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: null,
    username: null,
    isAdmin: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserToStore: (state, action) => {
      state.value.id = action.payload.id;
      state.value.username = action.payload.username;
      state.value.isAdmin = action.payload.isAdmin;
    },
    removeUserFromStore: (state, action) => {
      state.value.id = null;
      state.value.username = null;
    },
  },
});

export const { addUserToStore, removeUserFromStore } = userSlice.actions;
export default userSlice.reducer;
