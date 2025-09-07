import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider>
    <Router>
      <App />
      <Toaster />
    </Router>
  </Provider>
);
