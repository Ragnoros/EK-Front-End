import { ReactNode, useEffect } from "react";

type getItemsProps = {
  setItems: Function;
  children: ReactNode;
};

function GetItems({ setItems, children }: getItemsProps) {
  useEffect(() => {
    // fetchItems().then((data) => {
    //   setItems(data);
    // });
  }, []);
  return <>{children}</>;
}

export default GetItems;
