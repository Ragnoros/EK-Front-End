import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import GetItems from "./components/GetItems";
import GetItem from "./components/GetItem";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Item from "./components/Item";
import Notifcation from "./components/Notification";
import Trade from "./components/Trade";
import { getUserById } from "./api";
import Terms from "./components/Terms";
import NotFound from "./components/NotFound";
import Likes from "./components/Likes";

interface ItemData {}

interface UserData {
  username: string;
}

function App() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [item, setItem] = useState<ItemData | null>(null);
  const [user, setUser] = useState<UserData>();

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (user_id) {
      getUserById(user_id).then((user) => {
        setUser(user);
      });
    }
  }, [user_id]);

  document.title = user?.username
    ? `${user?.username} - Exchange Kings`
    : "Exchange Kings";

  return (
    <>
      <Header>
        <Notifcation user={user} />
      </Header>
      <Routes>
        <Route
          path="/"
          element={
            <Home user={user}>
              <GetItems items={items} setItems={setItems} user={user} />
            </Home>
          }
        />
        <Route
          path="/items/:item_id"
          element={
            <GetItem setItem={setItem}>{item && <Item item={item} />} </GetItem>
          }
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/likes" element={<Likes />} />
        <Route
          path="/trades/:matching_id/:username"
          element={<Trade user={user} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
