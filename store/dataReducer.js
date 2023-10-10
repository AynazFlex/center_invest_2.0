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
  access_token: null,
  token_type: null,
  isPending: false,
  error_msg: null,
  cards: null,
  isAuth: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setAuth.fulfilled, (state, { payload }) => {
      const { access_token, token_type } = payload;
      state.access_token = access_token;
      state.token_type = token_type;
      state.isPending = false;
      state.isAuth = true;
    });
    builder.addCase(setAuth.pending, (state) => {
      state.isPending = true;
      state.error_msg = null;
    });
    builder.addCase(setAuth.rejected, (state) => {
      state.error_msg = "Some error";
      state.isPending = false;
    });
    builder.addCase(getCards.fulfilled, (state, { payload }) => {
      state.cards = payload;
      state.isPending = false;
    });
    builder.addCase(getCards.pending, (state) => {
      state.isPending = true;
      state.error_msg = null;
    });
    builder.addCase(getCards.rejected, (state) => {
      state.error_msg = "Some error";
      state.isPending = false;
    });
  },
});

const { reducer } = dataSlice;
export default reducer;
