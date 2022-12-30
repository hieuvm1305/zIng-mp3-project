import React from "react";
import logo from "../assets/logo.svg";
import { HiOutlineChartPie } from "react-icons/hi";
import { MdOutlineLibraryMusic, MdOutlineFeed } from "react-icons/md";
import { TbChartArcs } from "react-icons/tb";
import { useNavigate, NavLink } from "react-router-dom";
import path from "../route/path";

const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icons: <MdOutlineLibraryMusic size={24} />,
  },
  {
    path: "/home",
    text: "Khám phá",
    end: true,
    icons: <TbChartArcs size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icons: <HiOutlineChartPie size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icons: <MdOutlineFeed size={24} />,
  },
];

const notActiveStyle =
  "py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center";
const activeStyle =
  "py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center";

function SideBarLeft() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-main-200">
      <div onClick={() => navigate(path.HOME)} className="px-[25px] mt-3">
        <img src={logo} alt="logo" className="w-[120px] h-10" />
      </div>
      <div className="flex flex-col px-auto">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SideBarLeft;
