import { configureStore } from "@reduxjs/toolkit";
import reducerData from "./reducerData";

export const store = configureStore({
  reducer: {
    data: reducerData,
  },
});
