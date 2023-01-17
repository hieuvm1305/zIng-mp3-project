import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useRoutes} from "react-router-dom";
import { getHomeAction } from "./redux/homeSlice";
import path from "./route/path";
import Public from "./pages/Public";
import ErrorPage from "./Layout/ErrorPage";
import route from "./route/index";


function Route(){
 const element = useRoutes([
  {
    path: path.HOME,
    element: <Public />,
    children: [
      ...route
    ],
  },
  {
    path: "*",
    element: <ErrorPage />
  }
 ])
 return element;
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeAction());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <Route />
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
