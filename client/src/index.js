import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import './styles.css'
import { Provider } from "@syncstate/react";
import { store } from "./redux/store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
