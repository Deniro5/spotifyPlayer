/* eslint-disable @typescript-eslint/explicit-function-return-type */
/// <reference types="vite-plugin-svgr/client" />
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  return code ? <Home code={code} /> : <Login />;
};

export default App;
