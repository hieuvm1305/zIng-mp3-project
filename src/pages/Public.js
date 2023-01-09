import React from "react";
import { Outlet } from "react-router-dom";
import Player from "../components/Player";
import SideBarLeft from "../components/SidebarLeft";
import Header from "../components/Header";
import SidebarRight from "../components/SidebarRight";

function Public() {
  return (
    <div className="w-full relative min-h-screen max-w-screen h-full flex flex-row bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none border border-blue-500 fixed">
          <SideBarLeft />
        </div>
        <div className="flex flex-col flex-auto h-full border border-red-500 mb-[100px] ml-[240px]">
          <div className="h-[70px] w-full flex items-center mb-5 sticky top-0 bg-main-300">
            <Header />
          </div>
          <div className="mt-[70px]">
            <Outlet />
          </div>
        </div>
        <div className="w-[329px] hidden 1600:flex flex-none border animate-slide-left">
          <SidebarRight />
        </div>
        <div className="fixed bottom-0 left-0 right-0 h-[70px]">
          <Player />
        </div>
      </div>
    </div>
  );
}

export default Public;
