import React from 'react'
import Rating from '../../Profile/Rating'
import { MdOutlineStar } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Profile = () => {
    const role = useSelector(state => state.role.role)
    return (
        <div className='xs:mt-16 px-8 xs:px-6'>
            <div className="dark:bg-dark300 bg-lightgray p-6 rounded-[10px] mb-8 flex xs:flex-col justify-between xs:gap-4 sm:items-end">
                <div className="pt-4 relative flex gap-8 xs:gap-3 xs:flex-col xs:items-center">
                    <div className='xs:absolute xs:-top-1/2 xs:-translate-y-1/2 w-[120px] h-[120px] xs:w-24 xs:h-24 rounded-full overflow-hidden dark:opacity-60 opacity-80'>
                        <img
                            src={require('../../../images/profilePic.jpeg')} alt="Icon"
                            className="w-full h-full"
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='dark:text-dark100 text-gray10 text-2xl xs:text-base mb-1 xs:mb-0'>Leon</p>
                        <p className='dark:text-dark70 text-light70 text-base xs:text-xs'>Anksiyete və Stress</p>
                        <div className="flex justify-center items-center gap-2 mt-2 xs:mt-1">
                            <div className="dark:text-dark100 text-gray10 text-sm">4.5</div>
                            <MdOutlineStar className='w-4 h-4 text-yellowlight dark:text-yellowdark' />

                        </div>
                    </div>
                </div>
                {role === 'user' && (
                    <div className='flex items-center gap-6 xs:gap-3 xs:justify-center'>
                        <Link to="../specificpool">
                            <button
                                // onClick={() => dispatch(setListener(listener))}
                                className='dark:bg-green bg-lightgreen w-[171px] xs:w-[124px] rounded-[5px] py-[10px] xs:py-[7.5px] text-xs xs:text-[10px] text-dark100'>
                                Müraciət et
                            </button>
                        </Link>
                        <Link to="../suggest">
                            <button
                                // onClick={() => dispatch(setListener(listener))}
                                className='dark:bg-blue100 bg-lightblue w-[171px] xs:w-[124px] rounded-[5px] py-[10px] xs:py-[7.5px] text-xs xs:text-[10px] text-dark100'>
                                Təklif et
                            </button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-6 xs:gap-4">
                <p className='dark:text-dark100 text-gray10 text-base xs:text-sm font-medium'>Dəyərləndirmə</p>
                <Rating />
                <Rating />
            </div>
        </div>
    )
}

export default Profile