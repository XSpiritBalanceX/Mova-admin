import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MainState = {
  locale: string;
  isLogin: boolean;
};

const languageCurrent = localStorage.getItem("mova_admin_lang");
const tokens = localStorage.getItem("mova_admin_access_token") && localStorage.getItem("mova_admin_refresh_token");

const initialState: MainState = {
  locale: languageCurrent ? languageCurrent : navigator.language === "ru" ? "ru" : "en",
  isLogin: tokens ? true : false,
};

const movaAdminSlice = createSlice({
  name: "movaAdmin",
  initialState,
  reducers: {
    changeLocale(state, action: PayloadAction<string>) {
      state.locale = action.payload;
      localStorage.setItem("mova_admin_lang", action.payload);
    },
  },
});

export const { changeLocale } = movaAdminSlice.actions;

export default movaAdminSlice.reducer;
