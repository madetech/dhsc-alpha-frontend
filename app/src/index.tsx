import React from "react";
import ReactDOM from "react-dom/client";
import StartPage from "./pages/startPage/StartPage"


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StartPage />    
  </React.StrictMode>
);
