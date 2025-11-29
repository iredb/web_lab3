import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/base.css";
import "./styles/inputs.css";
import "./styles/popups.css";
import "./styles/todo.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
