import { Link } from "react-router-dom";
import { likeItem } from "../api";

type CarouselProps = {
  items: ItemValues[];
};

type ItemValues = {
  item_name: string;
  img_string: string;
  _id: string;
};

function Carousel({ items }: CarouselProps) {
  console.log(items);
  const container = document.querySelector(".ek-card-group") as HTMLElement;

  if (container) {
    const originalFirstItem = container.firstElementChild;

    // Create a duplicate of the first item and append it to the end
    const firstItemClone = originalFirstItem?.cloneNode(true) as HTMLElement;
    if (firstItemClone) {
      container.appendChild(firstItemClone);
    }

    // Create a duplicate of the last item and prepend it to the beginning
    const lastItem = container.lastElementChild?.previousElementSibling; // Get the original last item
    const lastItemClone = lastItem?.cloneNode(true) as HTMLElement;
    if (lastItemClone) {
      container.insertBefore(lastItemClone, originalFirstItem);
    }

    // Initial scroll position adjustment
    const containerWidth = container.offsetWidth;
    container.scrollLeft = containerWidth;

    container.addEventListener("scroll", () => {
      const scrollPosition = container.scrollLeft;

      // Check if scrolled to the end
      if (
        scrollPosition + containerWidth >=
        container.scrollWidth - containerWidth
      ) {
        container.scrollLeft = containerWidth;
      }

      // Check if scrolled to the beginning
      if (scrollPosition === 0) {
        container.scrollLeft = container.scrollWidth - containerWidth * 2;
      }
    });
  }
  function like(item_id: string,user_id:string) {
    likeItem(item_id,user_id).then((like) => {
      console.log(like)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <main className="main-items">
        <div className="ek-card-group">
          {items.map((item, i) => (
            <section key={i} className="ek-card">
              <Link to={`/items/${item._id}`}>
                <div className="ek-card__overlay"></div>
              </Link>

              <img src={item.img_string} alt="" className="" />

              <h2 className="">{item.item_name}</h2>
              <button
                className="btn btn--icon btn--like"
                onClick={() => like(item._id,"66fbc2e6d21d87957aa7876c")}
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
        </div>
      </main>
    </>
  );
}

export default Carousel;
