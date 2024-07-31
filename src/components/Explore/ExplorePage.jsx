import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ExplorePage = () => {
  const navigate=useNavigate()
  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
  
      <div className="flex justify-between mx-6 lg:mx-0">
      <p className='dark:text-dark100 text-gray10 font-bold lg:text-2xl text-xl py-[26px]'>
        Kəşf et
      </p>
          <div className=' lg:hidden py-6 flex gap-3 items-center justify-end'>
            <button
              onClick={() => navigate('/home/settings/notifications')}
              className="dark:bg-darkgray bg-lightgray w-8 h-8 rounded-full flex justify-center items-center">
              <img
                src={require('../../icons/bell-dark.png')} alt="Icon"
                className="w-5 h-5" />
            </button>
            {/* <div className='flex items-center gap-4 text-sm'> */}
            <div className='flex items-center gap-4 text-sm'>
                    <button
                       onClick={() => navigate('/home/settings/finance')}
                        className='w-[87px] bg-lightblue dark:bg-blue100 text-dark100 rounded-[5px] p-[10px] gap-[10px] flex items-center justify-center'>
                        <span>149 AZN</span>
                    </button>
                </div>
              {/* <button
                onClick={() => navigate('/home/settings/finance')}
                className='w-[87px] text-[10px] bg-lightblue dark:bg-blue100 text-dark100 rounded-[2px] p-2 gap-2 flex items-center justify-center'>
                <span>149 AZN</span>
              </button> */}
            {/* </div> */}
          </div>
        </div>
      <div className='py-9 pt-0 pb-8 lg:pb-0 lg:pt-0 bg-transparent lg:dark:bg-darkblack lg:bg-lightwhite rounded-[10px] h-full overflow-y-auto scrollbar'>
        <Outlet />
      </div>
    </div>
  )
}

export default ExplorePage