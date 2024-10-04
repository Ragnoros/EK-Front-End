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

interface ItemData {
  name: string;
}

interface UserData {
  username: string;
}

function App() {
  const [items, setItems] = useState<ItemData[]>([]);
  const [item, setItem] = useState<ItemData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (user_id) {
      getUserById(user_id).then((user) => {
        setUser(user);
        console.log(user);
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
            <Home>
              <GetItems items={items} setItems={setItems} />
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
        <Route path="/trades/:user_id/:their_user_id" element={<Trade />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
