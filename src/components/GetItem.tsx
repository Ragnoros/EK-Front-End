import { ReactNode, useEffect } from "react";
import { getItemById } from "../api";
import { useParams } from "react-router-dom";

type getItemsProps = {
  setItem: Function;
  children: ReactNode;
};

function GetItems({ setItem, children }: getItemsProps) {
  const { item_id } = useParams<{ item_id: string }>();
  useEffect(() => {
    if (item_id) {
      getItemById(item_id).then((item) => {
        setItem(item);
      });
    }
  }, [item_id]);
  return <>{children}</>;
}

export default GetItems;
