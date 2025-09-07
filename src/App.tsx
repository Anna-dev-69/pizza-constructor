import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import { useStore } from "./store/store";
import OrderProcess from "./pages/OrderProcess";
import { Toaster } from "@chakra-ui/react";

function App() {
  const basket = useStore((state) => state.basket);
  const initializeFromStorage = useStore((s) => s.initializeFromStorage);
  const location = useLocation();

  const showHeader = location.pathname !== "/order";
  console.log("App basket:", basket);

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

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
