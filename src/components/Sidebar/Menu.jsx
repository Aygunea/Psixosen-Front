// Menu.js
import React from 'react';
import { VscMusic } from "react-icons/vsc";
import { SlExclamation } from "react-icons/sl";
import { IoSettingsSharp } from "react-icons/io5";
import { RiMap2Line } from "react-icons/ri";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { LuUsers2 } from "react-icons/lu";

import { NavLink } from "react-router-dom";
const menu = [
  {
    icon: <RiMap2Line className="lg:text-lg text-base" />,
    title: "Kəşf et",
    key: "explore",
    path: "/home/explore"
  },
  {
    icon: <LuUsers2 className="lg:text-lg text-base" />,
    title: "Söhbətlər",
    key: "conversations",
    path: "/home/conversations"
  },
  {
    icon: <PiDownloadSimpleBold className="lg:text-lg text-base" />,
    title: "Müraciətlər",
    key: "requests",
    path: "/home/requests"
  },
  {
    icon: <VscMusic className="lg:text-lg text-base" />,
    title: "Musiqi",
    key: "music",
    path: "/home/music"
  },
  {
    icon: <SlExclamation className="lg:text-lg text-base" />,
    title: "Bildir",
    key: "complaint",
    path: "/home/complaint"
  },
  {
    icon: <IoSettingsSharp className="lg:text-lg text-base" />,
    title: "Tənzimləmələr",
    key: "settings",
    path: "/home/settings"
  },
];

const Menu = () => {
  return (
    <ul className="text-darkgray dark:text-dark100 flex flex-col gap-2 xs:px-1 lg:w-[215px] w-[180px]">
      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => `lg:py-[13px] py-2 px-3 rounded-[5px] cursor-pointer ${isActive ? 'dark:bg-navigationdark bg-lightgray text-darkgray dark:text-darkblack' : ''}`}
        >
          <li className="flex items-center gap-2 xs:gap-0">
           <p className='xs:text-xs'> {item.icon}</p>
            <p className="sm:block hidden text-sm lg:text-lg">{item.title}</p>
          </li>
        </NavLink>
      ))
      }
    </ul >
  );
};

export default Menu;
