import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import GetItems from "./components/GetItems";
import Carousel from "./components/Carousel";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

type itemsState = {
  name: string;
};

function App() {
  const [items, setItems] = useState<itemsState[]>([]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/items"
          element={
            <GetItems setItems={setItems}>
              <Carousel />
            </GetItems>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
