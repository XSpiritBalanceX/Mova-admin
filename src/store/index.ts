import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import movaAdminSlice from "./movaAdminSlice";

export const store = configureStore({
  reducer: {
    movaAdmin: movaAdminSlice,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
