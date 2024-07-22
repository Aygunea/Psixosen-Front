import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { SlExclamation } from "react-icons/sl";
import { GoFileMedia } from "react-icons/go";
import { CiFileOn } from "react-icons/ci";
import { HiOutlineStar } from "react-icons/hi2";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";

const menu = [
    {
        icon: <SlExclamation className="w-6 h-6 mr-4" />,
        title: "Info",
        path: "info"
    },
    {
        icon: <GoFileMedia className="w-6 h-6 mr-4" />,
        title: "Media",
        path: "media"
    },
    {
        icon: <CiFileOn className="w-6 h-6 mr-4" />,
        title: "Fayllar",
        path: "files"
    },
    {
        icon: <HiOutlineStar className="w-6 h-6 mr-4" />,
        title: "Ulduzlanmış mesajlar",
        path: "starmessages"
    },
    {
        icon: <PiLinkSimpleHorizontalBold className="w-6 h-6 mr-4" />,
        title: "Keçidlər",
        path: "links"
    },
];

const ListenerProfile = () => {
    return (
        <div className="grid grid-cols-[308px_auto]">
            <ul className="text-darkgray dark:text-dark100 flex flex-col gap-2 w-[308px]">
                {menu.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) => `py-3 px-3 rounded-[5px] cursor-pointer ${isActive ? 'dark:bg-darkgray bg-dark100 text-dark100' : ''}`}
                    >
                        <li className="flex items-center">
                            {item.icon}
                            <p className="text-base">{item.title}</p>
                        </li>
                    </NavLink>
                ))}
            </ul>
            <Outlet />
        </div>
    );
};

export default ListenerProfile;
