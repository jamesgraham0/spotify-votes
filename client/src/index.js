import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import './styles.css'
import { createDocStore } from "@syncstate/core";
import { Provider } from "@syncstate/react";

const store = createDocStore({ queue: [] });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
