import axios from "axios";

const api = axios.create({ baseURL: "https://ek-back-end.onrender.com/api" });

export const getAllItemsExcludingUsers = (username: string) => {
  return api.get(`/items?username=${username}`).then((response) => {
    return response.data;
  });
};

export const getItemById = (item_id: string) => {
  return api.get(`/items/${item_id}`).then((response) => {
    return response.data;
  });
};

export const postItemByUsername = (
  username: string,
  item_name: string,
  desc: string,
  img: string
) => {
  return api
    .post(`/items/${username}`, {
      item_name: item_name,
      description: desc,
      img_string: img,
    })
    .then((response) => {
      return response.data;
    });
};

export const likeItem = (item_id: string, user_id: string) => {
  return api.patch(`/items/${item_id}`, { likes: user_id }).then((response) => {
    return response.data;
  });
};

export const userLikes = (user_id: string) => {
  return api.get(`/likes/${user_id}`).then((response) => {
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
    .post(`/matchcheck`, { user_id: user_id, item_id: item_id })
    .then((response) => {
      return response.data;
    });
};

export const trade = (matching_id: string, username: string) => {
  console.log(username)
  return api.get(`/trades/${matching_id}/${username}`).then((response) => {
    return response.data;
  });
};

export const setTrade = (item_id: string, bool: boolean) => {
  return api
    .patch("/settrade", { match_id: item_id, bool: bool })
    .then((response) => {
      return response.data;
    });
};

export const tradeSuccess = (matching_id: string) => {
  return api.get(`/tradesuccess/${matching_id}`).then((response) => {
    return response.data;
  });
};
