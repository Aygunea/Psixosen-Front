import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store/store";

import { BrowserRouter } from "react-router-dom";
if (localStorage.getItem('darkMode') === null || localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
