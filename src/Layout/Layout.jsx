import React from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
      <div className='flex justify-between lg:px-0 px-6'>
        <p className='dark:text-dark100 text-gray10 font-bold lg:text-2xl text-xl py-[26px]'>
          {title}
        </p>
        <div className="block lg:hidden">
          <div className='py-6 flex gap-3 items-center justify-end'>
          <button
              onClick={() => navigate('/home/settings/notifications')}
              className="dark:bg-darkgray bg-lightgray w-8 h-8 rounded-full flex justify-center items-center">
              <img
                src={require('../icons/bell-dark.png')} alt="Icon"
                className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/home/settings/finance')}
              className='w-[87px] text-sm bg-lightblue dark:bg-blue100 text-dark100 rounded-[5px] p-[10px] gap-[10px] flex items-center justify-center'>
              <span>149 AZN</span>
            </button>
          </div>
        </div>
      </div>
      <div className='py-9 lg:pt-9 pb-8 lg:px-8 px-6 bg-transparent lg:dark:bg-darkblack lg:bg-lightwhite rounded-[10px] h-full overflow-y-auto lg:scrollbar scrollbar-hide'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
