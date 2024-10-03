import axios from "axios";

const api = axios.create({ baseURL: "https://ek-back-end.onrender.com/api" });

export const getAllItems = () => {
  return api.get("/items").then((response) => {
    return response.data;
  });
};

export const getItemById = (item_id: string) => {
  return api.get(`/items/${item_id}`).then((response) => {
    return response.data;
  });
};
