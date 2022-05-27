import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  newTaskDialogOpened: boolean
}

const initialState: DialogState = {
  newTaskDialogOpened: false
}

export const dialogSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setOpened(state, { payload: opened }: PayloadAction<boolean>) {
      return { ...state, newTaskDialogOpened: opened }
    }
  },
})

export default dialogSlice.reducer