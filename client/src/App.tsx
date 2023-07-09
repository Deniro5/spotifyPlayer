/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return code ? <Home code={code} /> : <Login />;
};

export default App;
