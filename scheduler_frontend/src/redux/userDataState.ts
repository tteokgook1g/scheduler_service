import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { typeUserData } from "../types";

interface userDataState {
  value: typeUserData;
}

const initialState: userDataState = {
  value: { isLoggedIn: false, id: undefined },
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, userData: PayloadAction<typeUserData>) => {
      state.value = userData.payload;
    },
  },
});

// actions
export const { setUserData } = userDataSlice.actions;

//selectors
export const selectUserData = (state: RootState) => {
  return state.userData.value;
};

export const userDataReducer = userDataSlice.reducer;
