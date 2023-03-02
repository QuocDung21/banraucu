import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testList: [],
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    addTest: (state, action) => {
      state.testList.push(action.payload);
    },
  },
});

export const { addTest } = testSlice.actions;
export default testSlice.reducer;
