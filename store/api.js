import axios from "axios";

const instance = axios.create({
  baseURL: "http://51.250.97.147/api/v1",
});

const setHeaders = ({ token_type, access_token }) => ({
  headers: {
    Authorization: `${token_type} ${access_token}`,
  },
});

const getWrapper =
  (url) =>
  async ({ access_token, token_type }) =>
    await instance.get(url, { ...setHeaders({ access_token, token_type }) });

export const fetchAuth = async ({ username, password }) =>
  await instance.post(
    "/auth",
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

export const fetchCards = getWrapper("/cards");

export const fetchCard = async ({ account_number, access_token, token_type }) =>
  await instance.get(
    `/get_cashback_for_choose/?account_number=${account_number}`,
    { ...setHeaders({ access_token, token_type }) }
  );

export const fetchChooseCardCashBack = async ({
  account_number,
  access_token,
  token_type,
  cashback,
}) => {
  const date = new Date();
  const month = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return await instance.post(
    "/choose_card_cashback/",
    {
      account_number,
      month,
      cashback,
    },
    { ...setHeaders({ access_token, token_type }) }
  );
};

export const fetchGetTransactions = getWrapper("/transactions/");

export const fetchLogout = getWrapper("/log_out/");
