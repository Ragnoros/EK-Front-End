import { ReactNode, useEffect } from "react";
import { getAllItems } from "../api";

type getItemsProps = {
  setItems: Function;
  children: ReactNode;
};

function GetItems({ setItems, children }: getItemsProps) {
  useEffect(() => {
    getAllItems().then((items) => {
      setItems(items);
    });
  }, []);
  return <>{children}</>;
}

export default GetItems;
