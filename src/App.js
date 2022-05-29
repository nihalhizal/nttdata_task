import React from "react";
import MuiAppBar from "./components/MuiAppBar";
import Loading from "./components/Loading";
import { Router } from "./router/router";

function App() {
  return (
    <div>
      <MuiAppBar />
      <Router />
      <Loading />
    </div>
  );
}

export default App;
