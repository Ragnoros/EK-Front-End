import { ReactNode, useContext, useEffect } from "react";
import { getItemById } from "../api";
import { Navigate, useParams } from "react-router-dom";
import AddItem from "./AddItem";
import { UserContext } from "../contexts/User";

type getItemsProps = {
  setItem: Function;
  children: ReactNode;
};

function GetItems({ setItem, children }: getItemsProps) {
  const { isLoggedIn } = useContext(UserContext);
  const { item_id } = useParams<{ item_id: string }>();
  useEffect(() => {
    if (item_id) {
      getItemById(item_id).then((item) => {
        setItem(item);
      });
    }
  }, [item_id]);
  return (
    <>
      {isLoggedIn ? (
        <>
          {children}
          <AddItem />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default GetItems;
