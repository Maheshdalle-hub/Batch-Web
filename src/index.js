import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import { Analytics } from "@vercel/analytics/react";  // ✅ Import Vercel Analytics

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
      <Analytics />  ;