import { configureStore } from "@reduxjs/toolkit";
import { taskDataReducer } from "./taskDataState";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userDataReducer } from "./userDataState";

export const store = configureStore({
  reducer: {
    taskData: taskDataReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
