import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
      <div className='flex justify-between xs:px-6'>
        <p className='dark:text-dark100 text-gray10 font-bold text-2xl xs:text-xl py-[26px]'>
          {title}
        </p>
        <div className="block sm:hidden">
          <div className='py-6 flex gap-3 justify-end'>
            <button
              onClick={() => navigate('/home/settings/notifications')}
              className="dark:bg-darkgray bg-lightgray w-7 h-7 rounded-full flex justify-center items-center">
              <img
                src={require('../icons/bell-dark.png')} alt="Icon"
                className="w-4 h-4" />
            </button>
            {/* <div className='flex items-center gap-4 text-sm'> */}
              <button
                onClick={() => navigate('/home/settings/finance')}
                className='w-[56px] text-[10px] bg-lightblue dark:bg-blue100 text-dark100 rounded-[2px] p-2 gap-2 flex items-center justify-center'>
                <span>149 AZN</span>
              </button>
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className='py-9 xs:pt-0 xs:pb-8 px-8 xs:px-6 bg-transparent sm:dark:bg-darkblack sm:bg-lightwhite rounded-[10px] h-full overflow-y-auto sm:scrollbar xs:scrollbar-hide'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
