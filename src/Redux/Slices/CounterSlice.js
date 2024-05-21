import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
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
  },
});

export const { incrementCount, decrementCount, resetCount } = counterSlice.actions;

export default counterSlice.reducer;
