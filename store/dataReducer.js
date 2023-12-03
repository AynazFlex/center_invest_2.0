import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAuth,
  fetchCards,
  fetchCard,
  fetchGetTransactions,
  fetchLogout,
  fetchChooseCardCashBack,
  fetchChat,
  fetchLimits,
  fetchLimit,
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

const formater = (arg) => (arg < 10 ? `0${arg}` : arg);

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
    console.log(transactions);

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
        category: "",
        total: 0,
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

export const getChat = createAsyncThunk(
  "data/chat",
  async (promt, thunkAPI) => {
    try {
      const { access_token, token_type } = thunkAPI.getState().data;
      const { data } = await fetchChat({
        promt,
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
      const mount = data.reduce(
        (m, { transactions }) => transactions.length + m,
        0
      );
      if (mount) return data;
      return thunkAPI.rejectWithValue("У вас еще не было транзакций");
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
    }
  }
);

export const getLimits = createAsyncThunk(
  "data/limits",
  async (_, thunkAPI) => {
    try {
      const { access_token, token_type } = thunkAPI.getState().data;
      const { data } = await fetchLimits({ access_token, token_type });
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.detail || "Error :/");
    }
  }
);

export const setLimits = createAsyncThunk(
  "data/setLimits",
  async (limits, thunkAPI) => {
    try {
      const { access_token, token_type } = thunkAPI.getState().data;
      const { value } = await Promise.allSettled(
        limits.map(({ category, value }) =>
          fetchLimit({
            category,
            value,
            access_token,
            token_type,
          })
        )
      );
      return value;
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
      const { data } = await fetchChooseCardCashBack({
        account_number,
        cashback,
        access_token,
        token_type,
      });
      return data;
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
      time: "01:56 06.10.2023",
    },
  ],
  chat: [],
  limits: [
    { category: "автозапчасти", value: "0" },
    { category: "аквариум", value: "0" },
    { category: "напитки", value: "0" },
    { category: "уборка", value: "0" },
    { category: "одежда", value: "0" },
    { category: "закуски и приправы", value: "0" },
    { category: "продукты питания", value: "0" },
    { category: "видеоигры", value: "0" },
    { category: "образование", value: "0" },
    { category: "электроника", value: "0" },
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
    });
    builder.addCase(setLogout.pending, pending);
    builder.addCase(setLogout.rejected, rejected);
    builder.addCase(setNewCashbacks.fulfilled, (state, { payload }) => {
      state.isPending = false;
      state.isDone = true;

      const date = new Date();
      state.notifications.push({
        title: "Центр-инвест",
        body: `Ваше обращение №${Math.floor(
          Math.random() * 2000 + 1000
        )} рассмотрено. Вы выбрали кешбэки${payload.reduce(
          (str, { product_type }) => `${str} ${product_type},`,
          ""
        )}`,
        time: `${formater(date.getHours())}:${formater(
          date.getMinutes()
        )} ${formater(date.getDate())}.${formater(
          date.getMonth() + 1
        )}.${date.getFullYear()}`,
      });
    });
    builder.addCase(setNewCashbacks.pending, pending);
    builder.addCase(setNewCashbacks.rejected, rejected);
    builder.addCase(getChat.fulfilled, (state, { payload }) => {
      state.chat.push(payload);
      state.isPending = false;
    });
    builder.addCase(getChat.pending, pending);
    builder.addCase(getChat.rejected, rejected);
    builder.addCase(getLimits.fulfilled, (state, { payload }) => {
      state.limits = payload;
      state.isPending = false;
    });
    builder.addCase(getLimits.pending, pending);
    builder.addCase(getLimits.rejected, rejected);
    builder.addCase(setLimits.fulfilled, (state) => {
      state.isPending = false;
    });
    builder.addCase(setLimits.pending, pending);
    builder.addCase(setLimits.rejected, rejected);
  },
});

const { reducer, actions } = dataSlice;
export const { resetError, resetDone } = actions;
export default reducer;
