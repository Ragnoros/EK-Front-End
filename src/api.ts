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

export const likeItem = (item_id: string, user_id: string) => {
  console.log(item_id);
  return api.patch(`/items/${item_id}`, { likes: user_id }).then((response) => {
    console.log(response);
    return response.data;
  });
};

export const getAllUsers = () => {
  return api.get("/users").then((response) => {
    return response.data;
  });
};

export const getUserById = (user_id: string) => {
  return api.get(`/users/${user_id}`).then((response) => {
    return response.data;
  });
};

export const getUserByUsername = (username: string) => {
  return api.get(`/user/${username}`).then((response) => {
    return response.data;
  });
};

export const deleteUserById = (user_id: string) => {
  return api.get(`/delete/${user_id}`).then((response) => {
    return response.data;
  });
};

export const getUserMatchesById = (user_id: string) => {
  return api.get(`/matches/${user_id}`).then((response) => {
    return response.data;
  });
};

export const matchCheck = (item_id: string, user_id: string) => {
  return api
    .post(`/matchcheck`, { item_id: item_id, user_id: user_id })
    .then((response) => {
      return response.data;
    });
};

export const trade = (user_id: string, their_user_id: string) => {
  return api.get(`/trades/${user_id}/${their_user_id}`).then((response) => {
    return response.data;
  });
};
