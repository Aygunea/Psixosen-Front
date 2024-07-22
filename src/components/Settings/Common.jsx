import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialMenu } from '../../slices/menu.slice';
import { NavLink, Outlet } from 'react-router-dom';
const Common = () => {
  const dispatch = useDispatch()
  const [hasScroll, setHasScroll] = useState(false);
  const contentRef = useRef(null);

  const settingsMenu = [
    { title: "Profilim", path: "profile" },
    { title: "Şifrə", path: "password" },
    { title: "Tarixçə", path: "history" },
    { title: "Maliyyə", path: "finance" },
    // { title: "Statistika", path: "statistics" },
    { title: "Bildirişlər", path: "notifications" },
    // { title: "Tərzim", path: "design" }

  ];

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        setHasScroll(contentRef.current.scrollHeight > contentRef.current.clientHeight);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, []);
  return (
    <div className='h-full bg-transparent sm:dark:bg-darkblack sm:bg-lightwhite rounded-[10px] pt-9 px-8 xs:px-6'>
      <ul className='xs:overflow-x-auto scrollbar-hide xs:text-xs w-full mb-9 grid grid-flow-col grid-cols-5 xs:grid-cols-[100px] text-center gap-7 xs:gap-[6px] bg-lightgray text-light50 dark:bg-dark300 dark:text-dark50 px-2 xs:px-[6px] rounded-[5px]'>
        {settingsMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `xs:w-[100px] py-3 xs:py-2 cursor-pointer ${isActive ? 'dark:text-dark100 dark:bg-darkblack m-[2px] rounded-[2px] bg-lightwhite text-gray10' : ''}`}
            onClick={() => dispatch(setInitialMenu(item.title))}
          >
            {item.title}
          </NavLink>
        ))}
      </ul>
      <div
        ref={contentRef}
        className={`overflow-y-auto sm:scrollbar xs:scrollbar-hide xs:h-full xs:pb-12 sm:h-[calc(100%-150px)] ${hasScroll ? 'pr-8' : ''}`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Common;




