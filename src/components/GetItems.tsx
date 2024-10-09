import { ReactNode, useEffect, useState } from "react";
import { getAllItemsExcludingUsers } from "../api";
import { Link } from "react-router-dom";
import { like } from "../utilities";

type getItemsProps = {
  children: ReactNode;
  user: {
    username: string;
  };
};

type ItemValues = {
  item_name: string;
  img_string: string;
  _id: string;
};

const user_id = localStorage.getItem("user_id") ?? "";

function GetItems({ user }: getItemsProps) {
  const [items, setItems] = useState<ItemValues[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      if (user?.username) {
        const fetchedItems = await getAllItemsExcludingUsers(user?.username);
        setItems(fetchedItems);
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [user?.username]);

  const likeTooltip = { tooltip: "Like" };

  return (
    <>
      <main className="main-items">
        <div className="ek-card-group">
          {isLoading ? (
            <div className="ek-card-group__loading">Loading...</div>
          ) : (
            <>
              {items.map((item, i) => (
                <section key={i} className="ek-card">
                  <Link to={`/items/${item._id}`}>
                    <div className="ek-card__overlay"></div>
                  </Link>

                  <img
                    src={item.img_string}
                    alt={`This is a ${item.item_name}`}
                    className=""
                  />

                  <h2 className="">{item.item_name}</h2>
                  <button
                    className="btn btn--icon btn--like"
                    onClick={() => like(item._id, user_id)}
                    {...likeTooltip}
                    aria-label={`like the ${item.item_name}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed"
                    >
                      <path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" />
                    </svg>
                  </button>
                </section>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default GetItems;
