import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Routes, Route} from "react-router-dom";
import { getHomeAction } from "./redux/homeSlice";
import path from "./route/path";
import Public from "./pages/Public";
import Home from "./pages/Home/Home";
import Top100 from "./pages/Top100";
import Album from "./pages/Album";
import Login from "./pages/Login";
import Mvideo from "./pages/Mvideo";
import Personal from "./pages/Personal";
import NewReleaseMusic from "./pages/NewReleaseMusic";
import SearchPage from "./pages/SearchPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeAction());
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path={path.HOME} element={<Public />}>
            <Route index element={<Home />} />
            <Route path={path.TOP100} element={<Top100 />}/>
            <Route path={path.PLAYLIST__TITLE__PID} element/>
            <Route path={path.ALBUM__TITLE__PID} element={<Album />}/>
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.MV} element={<Mvideo />}/>
            <Route path={path.PERSONAL} element={<Personal />}/>
            <Route path={path.NEWRELEASE} element={<NewReleaseMusic />}/>
            <Route path={path.Search} element={<SearchPage />} />
            <Route path="*" element={<div>404  Error</div>} />
          </Route>
        </Routes>
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
