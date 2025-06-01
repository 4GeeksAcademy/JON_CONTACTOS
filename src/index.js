import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import App from "./App";
import "./index.css";

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <ContactProvider>
          <App />
        </ContactProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
