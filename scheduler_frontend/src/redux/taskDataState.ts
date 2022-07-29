import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { typeTaskData } from "../types";

interface taskDataState {
  value: typeTaskData[];
}

const initialState: taskDataState = {
  value: [],
};

export const taskDataSlice = createSlice({
  name: "taskData",
  initialState,
  reducers: {
    setTaskData: (state, taskData: PayloadAction<typeTaskData[]>) => {
      state.value = taskData.payload;
    },
  },
});

// actions
export const { setTaskData } = taskDataSlice.actions;

//selectors
export const selectTaskData = (state: RootState) => {
  const parsedData = state.taskData.value
    ?.map((val: typeTaskData) => {
      return {
        ...val,
        date: new Date(val.date),
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return parsedData;
};

export const taskDataReducer = taskDataSlice.reducer;
