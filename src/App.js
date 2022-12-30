import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import { getHomeAction } from "./redux/homeSlice";
import path from "./route/path";
import Public from "./pages/Public";
import link from "./route/index";
function CreateRouter() {
  const element = useRoutes([
    {
      path: path.PUBLIC,
      element: <Public />,
      children: [
        ...link,
        {
          path: "*",
          element: <div>Page not found</div>,
        },
      ],
    },
  ]);
  return element;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeAction());
  }, []);

  return (
    <>
      <div className="App">
        <CreateRouter />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
