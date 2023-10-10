import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuth, fetchCards } from "./api";

export const setAuth = createAsyncThunk(
  "data/auth",
  async ({ username, password }) => {
    const { data } = await fetchAuth({ username, password });
    return data;
  }
);

export const getCards = createAsyncThunk("data/cards", async (_, thunkAPI) => {
  const { access_token, token_type } = thunkAPI.getState();
  const { data } = await fetchCards({ access_token, token_type });
  return data;
});

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
      const { access_token, token_type } = payload;
      state.access_token = access_token;
      state.token_type = token_type;
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
    [getCards.fulfilled]: (state, { payload }) => {
      state.cards = payload;
      state.isPending = false;
    },
    [getCards.pending]: (state) => {
      state.isPending = true;
      state.error_msg = null;
    },
    [getCards.rejected]: (state) => {
      state.error_msg = "Some error";
      state.isPending = false;
    },
  },
});

const { actions, reducer } = dataSlice;
export default reducer;
