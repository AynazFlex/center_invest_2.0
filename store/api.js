import axios from "axios";

const instance = axios.create({
  baseURL: "https://fp.centrinvest.ru/api/v1",
});

const getWrapper =
  (url) =>
  async ({ access_token, token_type }) =>
    await instance.get(url, {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

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
    {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }
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

  await instance.post(
    "/choose_card_cashback/",
    {
      account_number,
      month,
      cashback,
    },
    {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }
  );
};

export const fetchGetTransactions = async ({ access_token, token_type }) =>
  await instance.get("/transactions/", {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });

export const fetchLogout = async ({ access_token, token_type }) =>
  await instance.get("/log_out/", {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });
