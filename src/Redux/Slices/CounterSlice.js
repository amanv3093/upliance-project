import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0, LoginSuccessful: false },
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
    },
    decrementCount: (state) => {
      if (state.count > 0) {
        state.count -= 1;
      }
    },
    resetCount: (state) => {
      state.count = 0;
    },
    handelLoginSuccessful: (state, action) => {
      console.log(action);
      state.LoginSuccessful = action.payload;
    },
  },
});

export const {
  incrementCount,
  decrementCount,
  resetCount,
  handelLoginSuccessful,
} = counterSlice.actions;

export default counterSlice.reducer;
