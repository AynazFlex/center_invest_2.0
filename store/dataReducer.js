import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuth } from "./api";

export const setAuth = createAsyncThunk(
  "data/setAuth",
  async ({ username, password }) => {
    return await fetchAuth({ username, password });
  }
);

const initialState = {
  isPending: false,
  error_msg: null,
  value: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: {
    [setAuth.fulfilled]: (state, { payload }) => {
      state.value = payload;
      console.log(payload);
      state.isPending = false;
    },
    [setAuth.pending]: (state) => {
      state.isPending = true;
      state.error_msg = null;
    },
    [setAuth.rejected]: (state) => {
      state.error_msg = "Some error";
      state.isPending = false;
    },
  },
});

const { actions, reducer } = dataSlice;
export default reducer;
