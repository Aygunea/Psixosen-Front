// Menu.js
import React from 'react';
import { VscMusic } from "react-icons/vsc";
import { SlExclamation } from "react-icons/sl";
import { IoSettingsSharp } from "react-icons/io5";
import { PiUsersThin } from "react-icons/pi";
import { RiMap2Line } from "react-icons/ri";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
const menu = [
  {
    icon: <RiMap2Line className="w-6 h-6 xs:w-5 xs:h-5" />,
    title: "Kəşf et",
    key: "explore",
    path: "/home/explore"
  },
  {
    icon: <PiUsersThin className="w-6 h-6 xs:w-5 xs:h-5" />,
    title: "Söhbətlər",
    key: "conversations",
    path: "/home/conversations"
  },
  {
    icon: <PiDownloadSimpleBold className="w-6 h-6 xs:w-5 xs:h-5" />,
    title: "Müraciətlər",
    key: "requests",
    path: "/home/requests"
  },
  {
    icon: <VscMusic className="w-6 h-6 xs:w-5 xs:h-5" />,
    title: "Musiqi",
    key: "music",
    path: "/home/music"
  },
  {
    icon: <SlExclamation className="w-6 h-6 xs:w-5 xs:h-5" />,
    title: "Bildir",
    key: "complaint",
    path: "/home/complaint"
  },
  {
    icon: <IoSettingsSharp className="w-6 h-6 xs:w-5 xs:h-5" />,
    title: "Tənzimləmələr",
    key: "settings",
    path: "/home/settings"
  },
];

const Menu = () => {
  return (
    <ul className="text-darkgray dark:text-dark100 flex flex-col gap-2 xs:px-1 sm:w-[215px]">
      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => `py-[13px] px-3 rounded-[5px] cursor-pointer ${isActive ? 'dark:bg-navigationdark bg-lightgray text-darkgray dark:text-darkblack' : ''}`}
        >
          <li className="flex items-center gap-2 xs:gap-0">
           <p className='xs:text-xs'> {item.icon}</p>
            <p className="sm:block hidden text-lg">{item.title}</p>
          </li>
        </NavLink>
      ))
      }
    </ul >
  );
};

export default Menu;
