import { FaRegUser } from "react-icons/fa";
import { MdOutlineStar } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setListener, setListenerId } from "../../slices/listener.slice";
import { Link, useNavigate } from "react-router-dom";

const ListenerItem = ({ listener, name, number, category, description, userCount, rating, profilePic, onClick }) => {
    const role = useSelector(state => state.role.role)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleApplicationClick = () => {
        dispatch(setListener(listener));
        navigate("../specificpool");
    };

    const handleSuggestionClick = () => {
        dispatch(setListenerId(listener._id));
        navigate("../suggest");
    };
    return (
        <div className='py-4 flex justify-between xl:gap-[200px] gap-16 xs:gap-2 border-b dark:border-dark20'>
            {/* <Link to='profile'> */}
                <div className="flex items-center gap-4 xs:gap-1">
                    <div className='dark:text-dark70 text-light70 text-sm xs:text-xs'>
                        #{number}
                    </div>
                    <div className="flex lg:gap-6 gap-4 xs:gap-2">
                        <div className='lg:w-[50px] lg:h-[50px] w-[42px] h-[42px]'>
                            <img className='object-cover w-full h-full rounded-[5px] lg:overflow-hidden'
                                src={profilePic || require('../../images/listenerpp.jpeg')} alt={name} />
                        </div>
                        <div className="flex flex-col lg:gap-[5px] gap-[2px]">
                            <p className='dark:text-dark100 text-gray10 text-sm'>
                                {name}
                            </p>
                            <p className='dark:text-dark50 text-light50 text-xs text-[10px]'>
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            {/* </Link> */}
            {/* right */}
            <div className='flex items-center lg:justify-between justify-end xl:gap-[72px] gap-4 w-full'>
                <div className="hidden sm:grid xl:gap-[195px] sm:w-full">
                    <div className="flex justify-between gap-4 w-full">
                        <div className='dark:text-dark100 text-gray10 md:text-sm text-xs'>
                            {category}
                        </div>
                        <div className="flex gap-[50px]">
                            <div className='text-light50 flex items-center gap-3 text-sm'>
                                <FaRegUser className="w-4 h-4 dark:text-dark70" />
                                <p className='dark:text-dark50'>{userCount}</p>
                            </div>
                            {/* <div className='text-light50 flex items-center gap-3 text-sm'>
                                <MdOutlineStar className="w-4 h-4 dark:text-dark70" />
                                <p className='dark:text-dark50'>{rating}</p>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='flex items-center lg:gap-6 gap-3'>
                    {/* <button
                        onClick={handleApplicationClick}
                        className='dark:bg-green bg-lightgreen lg:w-[91px] w-16 rounded-[5px] lg:py-[10px] py-[7.5px] xl:text-sm text-[10px] text-dark100'>
                        Müraciət et
                    </button> */}
                    {role === 'user' && <button
                        onClick={handleSuggestionClick}
                        className='dark:bg-blue100 bg-lightblue lg:w-[91px] w-16 rounded-[5px] lg:py-[10px] py-[7.5px] xl:text-base text-xs text-dark100'>
                        Təklif et
                    </button>}

                </div>
            </div>
        </div >

    )
}

export default ListenerItem;

