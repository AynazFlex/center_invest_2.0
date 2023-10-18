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
  try {
    const { access_token, token_type } = thunkAPI.getState().data;
    const { data } = await fetchCards({ access_token, token_type });
    return data;
  } catch ({ response }) {
    return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
  }
});

export const getCard = createAsyncThunk(
  "data/card",
  async (account_number, thunkAPI) => {
    try {
      const { access_token, token_type } = thunkAPI.getState().data;
      const { data } = await fetchCard({
        account_number,
        access_token,
        token_type,
      });
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
    }
  }
);

export const getTransactions = createAsyncThunk(
  "data/transactions",
  async (_, thunkAPI) => {
    try {
      const { access_token, token_type } = thunkAPI.getState().data;
      const { data } = await fetchGetTransactions({ access_token, token_type });
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
    }
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
  reducers: {
    resetError: (state) => {
      state.error_msg = null;
    },
    setLogout: (state) => {
      state.access_token = null;
      state.token_type = null;
      state.isPending = false;
      state.error_msg = null;
      state.cards = null;
      state.card = null;
      state.k = null;
      state.isAuth = false;
      state.transactions = null;
    },
  },
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
    builder.addCase(getCards.rejected, (state, { payload }) => {
      state.error_msg = payload;
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
    builder.addCase(getCard.rejected, (state, { payload }) => {
      state.error_msg = payload;
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
    builder.addCase(getTransactions.rejected, (state, { payload }) => {
      state.error_msg = payload;
      state.isPending = false;
    });
  },
});

const { reducer, actions } = dataSlice;
export const { resetError, setLogout } = actions;
export default reducer;
