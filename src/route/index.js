import React from "react";
import Album from "../pages/Album";
import Home from "../pages/Home";
import path from "./path";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: path.HOME,
    element: <Home />,
  },
  {
    path: path.ALBUM__TITLE__PID,
    element: <Album />,
  },
  { path: path.PLAYLIST__TITLE__PID, element: <Album /> },
];
