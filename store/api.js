import axios from "axios";

const instance = axios.create({
  baseURL: "http://151.248.126.126/api/v1",
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

export const fetchCards = async ({ access_token, token_type }) =>
  await instance.get("/cards", {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });

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

  console.log(month);
  await instance.post(
    "/choose_card_cashback",
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
