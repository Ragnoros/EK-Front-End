import { like } from "../utilities";

type ItemProps = {
  item: {
    item_name: string;
    img_string: string;
    description: string;
    _id: string;
  };
};

function Item({ item }: ItemProps) {
  console.log(item);
  const likeTooltip = { tooltip: "Like" };
  const user_id = localStorage.getItem("user_id") ?? "";
  return (
    <>
      <main>
        <section className="ek-item-card">
          <img
            src={item.img_string}
            alt={`This is a ${item.item_name}`}
            className=""
          />
          <h2 className="">{item.item_name}</h2>
          <p>{item.description}</p>
          <button
            className="btn btn--icon"
            aria-label={`Like the ${item.item_name}`}
            {...likeTooltip}
            onClick={() => like(item._id, user_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
            </svg>
          </button>
        </section>
      </main>
    </>
  );
}

export default Item;
