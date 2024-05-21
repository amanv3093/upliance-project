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
      state.name = name;
      state.address = address;
      state.email = email;
      state.phone = phone;
      state.unsavedChanges = true;
    },
    saveUser(state, action) {
      const { id, name, address, email, phone } = action.payload;
      state.id = id;
      state.name = name;
      state.address = address;
      state.email = email;
      state.phone = phone;
      state.unsavedChanges = false;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    loadUser(state) {
      const savedData = JSON.parse(localStorage.getItem("userData"));
      if (savedData) {
        state.id = savedData.id;
        state.name = savedData.name;
        state.address = savedData.address;
        state.email = savedData.email;
        state.phone = savedData.phone;
        state.unsavedChanges = false;
      }
    },
  },
});

export const { setUser, saveUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
