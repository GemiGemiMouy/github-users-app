import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <div style={{ fontFamily: "Poppins, sans-serif" }}>

    <App />
    </div>
  </React.StrictMode>
);
