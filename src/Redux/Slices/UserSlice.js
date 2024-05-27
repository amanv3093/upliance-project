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
      content: "",
      unsavedChanges: false,
    },
  },
  reducers: {
    setUser(state, action) {
      const { name, address, email, phone } = action.payload;
      state.user = { ...state.user, name, address, email, phone, unsavedChanges: true };
    },
    setUserContent(state, action) {
      state.user.content = action.payload.content;
      state.user.unsavedChanges = true;
    },
    saveUser(state, action) {
      const { id, name, address, email, phone, content } = action.payload;
      state.user = { id, name, address, email, phone, content, unsavedChanges: false };
      localStorage.setItem("userData", JSON.stringify(state.user));
    },
    loadUser(state) {
      const savedData = JSON.parse(localStorage.getItem("userData"));
      if (savedData) {
        state.user = { ...savedData, unsavedChanges: false };
      }
    },
  },
});

export const { setUser, setUserContent, saveUser, loadUser } = userSlice.actions;
export default userSlice.reducer;
