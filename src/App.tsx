import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import GetItems from "./components/GetItems";
import GetItem from "./components/GetItem";
import Carousel from "./components/Carousel";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Item from "./components/Item";
import Notifcation from "./components/Notification";
import Trade from "./components/Trade";

interface ItemData {
  name: string;
}

function App() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [item, setItem] = useState<ItemData | null>(null);

  return (
    <>
      <Header>
        <Notifcation />
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/items"
          element={
            <GetItems setItems={setItems}>
              <Carousel items={items} />
            </GetItems>
          }
        />
        <Route
          path="/items/:item_id"
          element={
            <GetItem setItem={setItem}>{item && <Item item={item} />} </GetItem>
          }
        />
        <Route path="/trade" element={<Trade />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
