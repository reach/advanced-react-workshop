import "./lib/index.css";
import React from "react";
import { unstable_createRoot } from "react-dom";
import App from "./App";

unstable_createRoot(document.getElementById("root")).render(<App />);
