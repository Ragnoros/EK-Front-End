import { likeItem, matchCheck } from "./api";

export const like = (item_id: string, user_id: string) => {
  likeItem(item_id, user_id)
    .then((like) => {
      console.log(like);
    })
    .catch((err) => {
      console.log("cannot like twice");
    });
  matchCheck(item_id, user_id).then((match) => {
    console.log(match);
  });
};
