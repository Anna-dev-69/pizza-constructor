import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Basket from "./pages/Basket";
import { useStore } from "./store/store";
import OrderProcess from "./pages/OrderProcess";
import { Toaster } from "@chakra-ui/react";

function App() {
  const basket = useStore((state) => state.basket);
  const location = useLocation();

  const showHeader = location.pathname !== "/order";
  console.log("App basket:", basket);

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/order" element={<OrderProcess />} />
      </Routes>
    </>
  );
}

export default App;
