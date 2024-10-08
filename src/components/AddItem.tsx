import { FormEvent, useState } from "react";
import { postItemByUsername } from "../api";

type AddItemProps = {
  user: { username: string };
};

function AddItem({ user }: AddItemProps) {
  const addItemDialog = document.getElementById(
    "add-item"
  ) as HTMLDialogElement;

  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemImg, setItemImg] = useState("");

  function addItem(e: FormEvent) {
    e.preventDefault();
    if (
      user?.username &&
      itemName !== "" &&
      itemDesc !== "" &&
      itemImg !== ""
    ) {
      postItemByUsername(user?.username, itemName, itemDesc, itemImg).then(
        (item) => {
          console.log(item);
        }
      );
    }
  }

  return (
    <>
      <button
        className="btn btn--fab"
        onClick={() => addItemDialog.showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
      <dialog id="add-item" className="dialog--add-item">
        <form onSubmit={(event) => addItem(event)} method="post">
          <header>
            <h2>Add Item</h2>
          </header>
          <label htmlFor="">Item name</label>
          <input
            type="text"
            name="item_name"
            placeholder="Enter item name"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemName(e.target?.value)
            }
          />
          <label htmlFor="">Item Description</label>
          <input
            type="text"
            name="item_description"
            placeholder="Enter item description"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemDesc(e.target?.value)
            }
          />
          <label htmlFor="">Image string</label>
          <input
            type="text"
            name="item_image_string"
            placeholder="Enter item image string"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItemImg(e.target?.value)
            }
          />
          <footer>
            <button type="reset" onClick={() => addItemDialog.close()}>
              Cancel
            </button>
            <button type="submit">Add Item</button>
          </footer>
        </form>
      </dialog>
    </>
  );
}

export default AddItem;
