import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAuth,
  fetchCards,
  fetchCard,
  fetchGetTransactions,
  fetchLogout,
  fetchChooseCardCashBack,
} from "./api";

export const convertMonth = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря",
};

export const colorForCategories = {
  автозапчасти: "#6B61FD",
  аквариум: "#63B7FD",
  напитки: "#FFBF00",
  уборка: "#FFDB00",
  одежда: "#B085F7",
  "закуски и приправы": "#FFAB00",
  "продукты питания": "#FF5F00",
  видеоигры: "#78F1B5",
  образование: "#4FBF29",
  электроника: "#12DA8D",
};

const setStatistics = (transactions, k) => {
  const map = new Map();
  const mapOfCategories = new Map();
  const mapForDiagram = new Map();
  let totalBack = 0;

  const converDate = (time) => {
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  transactions.forEach((item) => {
    const { account_number, bank, transactions } = item;
    transactions.forEach((transaction) => {
      const { category, time, value, name } = transaction;
      const kef = k[bank][category];
      if (kef) {
        const date = converDate(time);
        const back = (kef * value) / 100;
        totalBack += back;
        const object = {
          account_number,
          bank,
          transaction: {
            time,
            name,
            value,
            category,
            back,
          },
        };

        if (mapForDiagram.has(category)) {
          mapForDiagram.set(category, mapForDiagram.get(category) + back);
        } else {
          mapForDiagram.set(category, back);
        }

        if (mapOfCategories.has(category)) {
          mapOfCategories.set(category, mapOfCategories.get(category) + 1);
        } else {
          mapOfCategories.set(category, 1);
        }

        if (map.has(date)) {
          map.set(date, [...map.get(date), object]);
        } else {
          map.set(date, [object]);
        }
      }
    });
  });

  const maxCategories = () => {
    const arr = [...mapOfCategories];
    return arr.reduce(
      (obj, i) =>
        i[1] > obj.total
          ? {
              category: i[0],
              total: i[1],
            }
          : obj,
      {
        category: arr[0][0],
        total: arr[0][1],
      }
    );
  };

  return {
    data: [...map].sort((a, b) => new Date(b[0]) - new Date(a[0])),
    totalBack,
    mostPopularCategories: maxCategories().category,
    diagram: [...mapForDiagram].reduce(
      (res, [label, value]) => [
        ...res,
        {
          label,
          value,
          color: colorForCategories[label],
        },
      ],
      []
    ),
  };
};

export const setAuth = createAsyncThunk(
  "data/auth",
  async ({ username, password }, thunkAPI) => {
    try {
      const { data } = await fetchAuth({ username, password });
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
    }
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

export const setNewCashbacks = createAsyncThunk(
  "data/newCashbacks",
  async ({ account_number, cashback }, thunkAPI) => {
    try {
      const { access_token, token_type } = thunkAPI.getState().data;
      await fetchChooseCardCashBack({
        account_number,
        cashback,
        access_token,
        token_type,
      });
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
    }
  }
);

export const setLogout = createAsyncThunk(
  "data/logout",
  async (_, thunkAPI) => {
    try {
      const { access_token, token_type } = thunkAPI.getState().data;
      await fetchLogout({ access_token, token_type });
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
    }
  }
);

const pending = (state) => {
  state.isPending = true;
  state.error_msg = null;
};

const rejected = (state, { payload }) => {
  state.error_msg = payload;
  state.isPending = false;
};

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
  isDone: false,
  statistics: null,
  notifications: [
    {
      title: "Центр-инвест",
      body: "Ваше обращение №15446 рассмотрено. Категория операции «Ремонт61» изменена с Аквариум на Автозапчасти",
      time: "01:66 06.10.2023",
    },
  ],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error_msg = null;
    },
    resetDone: (state) => {
      state.isDone = false;
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
    builder.addCase(setAuth.pending, pending);
    builder.addCase(setAuth.rejected, rejected);
    builder.addCase(getCards.fulfilled, (state, { payload }) => {
      state.cards = payload;
      state.card = null;
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
    builder.addCase(getCards.pending, pending);
    builder.addCase(getCards.rejected, rejected);
    builder.addCase(getCard.fulfilled, (state, { payload }) => {
      state.card = payload;
      state.cards = null;
      state.transactions = null;
      state.isPending = false;
    });
    builder.addCase(getCard.pending, pending);
    builder.addCase(getCard.rejected, rejected);
    builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
      state.transactions = payload;
      state.isPending = false;
      state.statistics = setStatistics(payload, state.k);
    });
    builder.addCase(getTransactions.pending, pending);
    builder.addCase(getTransactions.rejected, rejected);
    builder.addCase(setLogout.fulfilled, (state) => {
      Object.keys(state).forEach((key) => (state[key] = initialState[key]));
      // state.access_token = null;
      // state.token_type = null;
      // state.isPending = false;
      // state.error_msg = null;
      // state.cards = null;
      // state.card = null;
      // state.k = null;
      // state.isAuth = false;
      // state.transactions = null;
      // state.isDone = false;
      // state.statistics = null;
    });
    builder.addCase(setLogout.pending, pending);
    builder.addCase(setLogout.rejected, rejected);
    builder.addCase(setNewCashbacks.fulfilled, (state) => {
      state.isPending = false;
      state.isDone = true;
    });
    builder.addCase(setNewCashbacks.pending, pending);
    builder.addCase(setNewCashbacks.rejected, rejected);
  },
});

const { reducer, actions } = dataSlice;
export const { resetError, resetDone } = actions;
export default reducer;
