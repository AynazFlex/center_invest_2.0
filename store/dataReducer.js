import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuth, fetchCards, fetchCard, fetchGetTransactions } from "./api";

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

export const getCard = createAsyncThunk(
  "data/card",
  async (account_number, thunkAPI) => {
    const { access_token, token_type } = thunkAPI.getState();
    const { data } = await fetchCard({
      account_number,
      access_token,
      token_type,
    });
    return data;
  }
);

export const getTransactions = createAsyncThunk(
  "data/transactions",
  async (_, thunkAPI) => {
    const { access_token, token_type } = thunkAPI.getState();
    const { data } = await fetchGetTransactions({ access_token, token_type });
    return data;
  }
);

const initialState = {
  access_token: null,
  token_type: null,
  isPending: false,
  error_msg: null,
  cards: null,
  card: null,
  k: null,
  isAuth: false,
  transactions: null,
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
      state.k = payload.reduce(
        (res, i) => ({
          ...res,
          [i.bank]: {
            ...i.cashbacks.reduce(
              (r, item) => ({
                ...r,
                [item.product_type]: item.value,
              }),
              {}
            ),
          },
        }),
        {}
      );
    });
    builder.addCase(getCards.pending, (state) => {
      state.isPending = true;
      state.error_msg = null;
    });
    builder.addCase(getCards.rejected, (state) => {
      state.error_msg = "Some error";
      state.isPending = false;
    });
    builder.addCase(getCard.fulfilled, (state, { payload }) => {
      state.card = payload;
      state.isPending = false;
    });
    builder.addCase(getCard.pending, (state) => {
      state.isPending = true;
      state.error_msg = null;
    });
    builder.addCase(getCard.rejected, (state) => {
      state.error_msg = "Some error";
      state.isPending = false;
    });
    builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
      state.transactions = payload;
      state.isPending = false;
    });
    builder.addCase(getTransactions.pending, (state) => {
      state.isPending = true;
      state.error_msg = null;
    });
    builder.addCase(getTransactions.rejected, (state) => {
      state.error_msg = "Some error";
      state.isPending = false;
    });
  },
});

const { reducer } = dataSlice;
export default reducer;
