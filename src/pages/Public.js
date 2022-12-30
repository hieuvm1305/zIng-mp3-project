import React from "react";
import { Outlet } from "react-router-dom";
import Player from "../components/Player";
import SideBarLeft from "../components/SidebarLeft";
import Header from "../components/Header";
import SidebarRight from "../components/SidebarRight";

function Public() {
  return (
    <div className="w-full relative h-screen flex flex-row bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] h-full flex-none border border-blue-500">
          <SideBarLeft />
        </div>
        <div className="flex flex-col flex-auto border border-red-500">
          <div className="h-[70px] w-full px-10 flex items-center mb-5">
            <Header />
          </div>
          <div>
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
