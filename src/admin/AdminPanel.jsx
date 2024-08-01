import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { SlExclamation } from "react-icons/sl";
import { LuUser } from "react-icons/lu";
import { VscMusic } from "react-icons/vsc";

const menu = [
  {
    icon: <LuUser className="lg:text-lg text-sm lg:mr-4" />,
    title: "İstifadəçilər",
    path: "users"
  },
  {
    icon: <VscMusic className="lg:text-lg text-sm lg:mr-4" />,
    title: "Musiqi",
    path: "music"
  },
  {
    icon: <SlExclamation className="lg:text-lg text-sm lg:mr-4" />,
    title: "Bildir",
    path: "inform"
  }
];

const AdminPanel = () => {
  const location = useLocation();

  const activeTitle = menu.find(item => location.pathname.includes(item.path))?.title || "Admin Panel";

  return (
    <div className="bg-light bg-fixed h-screen">
      <div className="grid lg:grid-cols-[280px_auto] grid-cols-[100px_auto] xxs:grid-cols-[60px_auto] h-full">
        <div className="flex flex-col items-center justify-center lg:bg-light200 ">
          <div className="flex items-center lg:px-6 border-b border-dark50 pb-6">
            <button className="text-gray10 bg-lightgray lg:w-[138px] w-max px-4 xxs:px-2 py-[6px] lg:text-base text-xs font-bold rounded-[20px]">
              Admin
            </button>
          </div>
          <ul className="w-full text-gray10 flex flex-col gap-4 lg:p-8 p-6 xxs:p-2 mt-6">
            {menu.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => `py-[14px] px-3 rounded-[5px] cursor-pointer ${isActive ? 'bg-lightgray text-darkblack' : ''}`}
              >
                <li className="flex items-center lg:w-max w-5">
                 <p> {item.icon}</p>
                  <p className="hidden lg:block text-base">{item.title}</p>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="pb-[100px] grid lg:grid-rows-[132px_auto] grid-rows-[80px_auto]  h-full scrollbar-hide lg:scrollbar overflow-y-auto">
          <div className="h-[132px] px-8 bg:bg-dark100 lg:text-2xl text-lg text-gray10 flex items-center">
            {activeTitle}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

