import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { SlExclamation } from "react-icons/sl";
import { LuUser } from "react-icons/lu";
import { VscMusic } from "react-icons/vsc";

const menu = [
  {
    icon: <LuUser className="w-6 h-6 mr-4" />,
    title: "İstifadəçilər",
    path: "users"
  },
  {
    icon: <VscMusic className="w-6 h-6 mr-4" />,
    title: "Musiqi",
    path: "music"
  },
  {
    icon: <SlExclamation className="w-6 h-6 mr-4" />,
    title: "Bildir",
    path: "inform"
  }
];

const AdminPanel = () => {
  const location = useLocation();

  const activeTitle = menu.find(item => location.pathname.includes(item.path))?.title || "Admin Panel";

  return (
    <div className="bg-light bg-fixed h-screen">
      <div className="grid grid-cols-[280px_auto] h-full">
        <div className="flex flex-col items-center justify-center bg-light200 ">
          <div className="flex items-center px-6 border-b border-dark50 pb-6">
            <button className="text-gray10 bg-lightgray w-[138px] py-[6px] font-bold rounded-[20px]">
              Admin
            </button>
          </div>
          <ul className="w-full text-gray10 flex flex-col gap-4 p-8 mt-6">
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => `py-[14px] px-3 rounded-[5px] cursor-pointer ${isActive ? 'bg-lightgray text-darkblack' : ''}`}
              >
                <li className="flex items-center">
                  {item.icon}
                  <p className="text-base">{item.title}</p>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="pb-[100px] grid grid-rows-[132px_auto] h-full overflow-y-auto">
          <div className="h-[132px] px-8 bg-dark100 text-2xl text-gray10 flex items-center">
            {activeTitle}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

