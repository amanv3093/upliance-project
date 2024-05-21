// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      name: "",
      address: "",
      email: "",
      phone: "",
      unsavedChanges: false,
    },
  },
  reducers: {
    setUser(state, action) {
      const { name, address, email, phone } = action.payload;

      state.user.name = name;
      state.user.address = address;
      state.user.email = email;
      state.user.phone = phone;
      state.user.unsavedChanges = true;
    },
    saveUser(state, action) {
      const { id, name, address, email, phone } = action.payload;
      state.user.id = id;
      state.user.name = name;
      state.user.address = address;
      state.user.email = email;
      state.user.phone = phone;
      state.user.unsavedChanges = false;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    loadUser(state) {
      const savedData = JSON.parse(localStorage.getItem("userData"));
      if (savedData) {
        state.user.id = savedData.id;
        state.user.name = savedData.name;
        state.user.address = savedData.address;
        state.user.email = savedData.email;
        state.user.phone = savedData.phone;
        state.user.unsavedChanges = false;
      }
    },
  },
});

export const { setUser, saveUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
