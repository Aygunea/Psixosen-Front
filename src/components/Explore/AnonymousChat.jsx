import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AnonymousChat = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div className='dark:bg-dark300 bg-dark100 grid grid-cols-[auto_92px] xs:grid-cols-1 gap-[37px] mt-[21px] px-8 xs:px-2'>
            <div className='flex flex-col py-4 mr-8'>
                <div className='flex items-center gap-2'>
                    <div className='pr-[160px] xs:pr-0'>
                        <p className='dark:text-dark100 text-gray10 text-2xl xs:text-sm mb-[10px]'>Anonim Dinləyici Çatı</p>
                        <div className='dark:text-dark70 text-light70 mb-4 xs:text-xs'>
                            Təsadüfi mütəxəssis seçimi əsasında Anonim Dinləyici Çatını başlatmaq  üçün
                            <span className='xs:text-sm dark:text-dark100 text-gray10'> “Müraciət et” </span>
                            düyməsinə klikləyin.
                        </div>
                    </div>
                    {/* mobile icon */}
                    <div className='xs:w-16 xs:block hidden'>
                        {darkMode ? <img
                            className='w-full'
                            src={require('../../images/icons.png')} alt="" /> :
                            <img
                                className='w-full '
                                src={require('../../images/iconslight.png')} alt="" />
                        }
                    </div>
                </div>
                <Link to="../poolrequest">
                    <div className="flex justify-end">
                        <button
                            className='w-[173px] xs:w-[100px] dark:bg-blue100 bg-lightblue text-sm xs:text-xs text-dark100 py-[11px] rounded-[10px] xs:rounded-[5px]'>
                            Müraciət Et
                        </button>
                    </div>
                </Link>
            </div>
            {/* desktop icon */}
            <div className='xs:hidden block'>
                {darkMode ? <img
                    className='w-[92px] h-full'
                    src={require('../../images/icons.png')} alt="" /> :
                    <img
                        className='w-[92px]'
                        src={require('../../images/iconslight.png')} alt="" />
                }
            </div>
        </div>
    )
}

export default AnonymousChat
