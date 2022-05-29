import React from "react";
import { Routes, Route } from "react-router-dom";
import { Tasks } from "./routerConstants";
import Task1 from "../pages/Task1";
import Task2 from "../pages/Task2";
import Task3 from "../pages/Task3";

export const Router = () => {
  return (
    <Routes>
      <Route path={Tasks[0].path} element={<Task1 />} />
      <Route path={Tasks[1].path} element={<Task2 />} />
      <Route path={Tasks[2].path} element={<Task3 />} />
    </Routes>
  );
};
