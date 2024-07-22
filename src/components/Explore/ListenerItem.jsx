import { FaRegUser } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setListener } from "../../slices/listener.slice";
import { Link, useNavigate } from "react-router-dom";

const ListenerItem = ({ listener, name, number, category, description, userCount, rating, profilePic, onClick }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate(); 

    const handleApplicationClick = () => {
        dispatch(setListener(listener));
        navigate("../specificpool"); 
    };

    const handleSuggestionClick = () => {
        dispatch(setListener(listener));
        navigate("../suggest");
    };
    return (
        <div className='py-4 flex justify-between gap-[200px] xs:gap-16 border-b dark:border-dark20'>
            <Link to='profile'>
                <div className="flex items-center gap-4">
                    <div className='dark:text-dark70 text-light70 text-sm'>
                        #{number}
                    </div>
                    <div className="flex gap-6 xs:gap-2">
                        <div className='w-[50px] h-[50px] xs:w-[42px] xs:h-[42px]'>
                            <img className='object-cover w-full h-full rounded-[5px] sm:overflow-hidden'
                                src={profilePic || require('../../images/listenerpp.jpeg')} alt={name} />
                        </div>
                        <div className="flex flex-col gap-[5px] xs:gap-[2px]">
                            <p className='dark:text-dark100 text-gray10 text-sm'>
                                {name}
                            </p>
                            <p className='dark:text-dark50 text-light50 text-xs xs:text-[10px]'>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            {/* right */}
            <div className='flex items-center justify-between xs:justify-end gap-[72px] w-full'>
                <div className="hidden sm:grid sm:gap-[195px] sm:w-full">
                    <div className="flex justify-between w-full">
                        <div className='dark:text-dark100 text-gray10 text-sm'>
                            {category}
                        </div>
                        <div className="flex gap-[50px]">
                            <div className='text-light50 flex items-center gap-3 text-sm'>
                                <FaRegUser className="w-4 h-4 dark:text-dark70" />
                                <p className='dark:text-dark50'>{userCount}</p>
                            </div>
                            <div className='text-light50 flex items-center gap-3 text-sm'>
                                <MdOutlineStar className="w-4 h-4 dark:text-dark70" />
                                <p className='dark:text-dark50'>{rating}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-6 xs:gap-3'>
                    <button
                        onClick={handleApplicationClick}
                        className='bg-green w-[91px] xs:w-16 rounded-[5px] py-[10px] xs:py-[7.5px] text-sm xs:text-[10px] text-dark100'>
                        Müraciət et
                    </button>
                    <button
                        onClick={handleSuggestionClick}
                        className='bg-blue100 w-[91px] xs:w-16 rounded-[5px] py-[10px] xs:py-[7.5px] text-sm xs:text-[10px] text-dark100'>
                        Təklif et
                    </button>
                </div>
            </div>
        </div >

    )
}

export default ListenerItem;

