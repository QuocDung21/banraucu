import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "./productSlide";
import  testSliceReducer  from "./testSlide";
import userSliceReducer from "./userSilice";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer,
    test: testSliceReducer,
  },
});
