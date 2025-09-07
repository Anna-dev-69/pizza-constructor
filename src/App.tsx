import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import { useStore } from "./store/store";
import OrderProcess from "./pages/OrderProcess";

function App() {
  useEffect(() => {
    useStore.getState().initializeFromStorage();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/order" element={<OrderProcess />} />
      </Routes>
    </>
  );
}

export default App;
