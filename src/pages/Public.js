import React, {useRef, useEffect} from "react";
import { Outlet } from "react-router-dom";
import Player from "../Layout/Player";
import SideBarLeft from "../Layout/SidebarLeft";
import Header from "../Layout/Header";
import SidebarRight from "../components/SidebarRight";


function Public() {
  const navBarRef= useRef();
  const listenScrollEvent = () => {
    if (window.scrollY > 35) {
      navBarRef.current.classList.add("shadow-lg", "border-b", "border-b-zinc-400", "bg-main-300");
    } else{
      navBarRef.current.classList.remove("shadow-lg", "border-b", "border-b-zinc-400", "bg-main-300");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  
  return (
    <div className="w-full relative min-h-screen h-full">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none border border-blue-500 bg-white fixed">
          <SideBarLeft />
        </div>
        <div className="flex flex-col flex-auto min-h-screen h-full border border-red-500  ml-[240px] bg-[#e0ebeb] mb-[90px]">
          <div className="h-[70px] right-0 left-[240px] mb-5 fixed top-0 z-40" ref={navBarRef}>
            <Header />
          </div>
          <div className="h-full">
            <Outlet />
          </div>
        </div>
        <div className="w-[329px] hidden 1600:flex flex-none border animate-slide-left">
          <SidebarRight />
        </div>
        <div className="fixed bottom-0 left-0 right-0 h-[90px]">
          <Player />
        </div>
      </div>
    </div>
  );
}

export default Public;
