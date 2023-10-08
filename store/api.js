import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8001/api/v1",
});

export const fetchAuth = async ({ username, password }) => {
  const data = await instance.post("/get_user", {
    username,
    password,
  });

  return data;
};
