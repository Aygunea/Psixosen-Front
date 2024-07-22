import React from 'react'
import ToggleButton from './ToggleButton'
import { useNavigate } from 'react-router-dom';

const Head = ({ children }) => {
    const navigate = useNavigate();

    const handleFinanceClick = () => {
        navigate('/home/settings/finance');
    };
    const handleNotificationClick = () => {
        navigate('/home/settings/notifications');
    };
    return (
        <div className="hidden sm:block">
            <div className='py-8 flex gap-8 justify-end pr-6'>
                <button
                    onClick={handleNotificationClick}
                    className="dark:bg-darkgray bg-lightgray w-9 h-9 rounded-full flex justify-center items-center">
                    <img
                        src={require('../../icons/bell-dark.png')} alt="Icon"
                        className="w-6 h-6" />
                </button>
                <ToggleButton />
                {children}
                <div className='flex items-center gap-4 text-sm'>
                    <p className='text-darkblack dark:text-dark100 hidden sm:block'>Balans:</p>
                    <button
                        onClick={handleFinanceClick}
                        className='w-[87px] bg-lightblue dark:bg-blue100 text-dark100 rounded-[5px] p-[10px] gap-[10px] flex items-center justify-center'>
                        <span>149 AZN</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Head



