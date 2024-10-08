import { useContext, useEffect, useState } from "react";
import { userLikes } from "../api";
import { UserContext } from "../contexts/User";
import { Navigate } from "react-router-dom";

type LikesState = {
  img_string: string;
  item_name: string;
};

function Likes() {
  const user_id = localStorage.getItem("user_id") ?? "";
  const [likes, setLikes] = useState<LikesState[]>();
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    const fetchItems = () => {
      if (user_id) {
        userLikes(user_id).then((likes) => {
          setLikes(likes);
        }).catch((err => {
            
        }));
      }
    };

    fetchItems();

    intervalId = setInterval(fetchItems, 5000);
  }, [user_id]);


  return (
    <>
      {user_id ? (
        <main className="main-likes">
          <h2>Likes</h2>
          <ul>
            {likes?.map((like, i) => (
              <li key={i}>
                <img src={like.img_string} alt="" />
                <p>{like.item_name}</p>
              </li>
            ))}
          </ul>
        </main>
      ) : <Navigate to="/" />}
    </>
  );
}

export default Likes;
