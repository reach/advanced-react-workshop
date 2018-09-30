import "./index.css";
import React from "react";
import { unstable_createRoot } from "react-dom";
// import App from "./components/App";
// import App from "./workouts/App";
import App from "./workouts/Refactor";

unstable_createRoot(document.getElementById("root")).render(<App />);
