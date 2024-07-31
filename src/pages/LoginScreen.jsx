import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../slices/role.slice';

const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.role.role);

    const handleRoleSelection = (selectedRole) => {
        console.log(`Selected Role: ${selectedRole}`);
        dispatch(setRole(selectedRole));
    };
    useEffect(() => {
        if (role === 'user' || role === 'listener') {
            navigate('/sign-in');
        }
    }, [role, navigate]);



    return (
        <div className="text-dark100 h-screen bg-dark">
            <div className="container mx-auto h-screen flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <div className="w-[446px] xs:w-full text-[#E7E7E7] text-center xs:text-2xl text-[36px] mb-[72px] xs:mb-14 flex flex-col flex-wrap justify-center">
                        <p> Anonim dinləyici çatına</p>
                        <p className="font-semibold"> Xoş Gəlmisiniz</p>
                    </div>
                    <button
                        onClick={() => handleRoleSelection('user')}
                        className='items-center hover:scale-95 transition duration-300 w-[350px] xs:w-full flex text-xl xs:text-base leading-8 border border-dark100 rounded-[10px] py-6 px-8 mb-14'>
                        <div className='w-8 h-8 xs:w-6 xs:h-6 bg-dark100 mr-6 rounded-full flex justify-center items-center'>
                            <img
                                className='w-[18px] h-[18px] xs:w-3 xs:h-3'
                                src={require('../icons/Vector.png')} alt="Icon" />
                        </div>
                        <div>
                            <span className='font-semibold mr-1'> Danışan </span>
                            olaraq davam et
                        </div>
                    </button>
                    <button
                        onClick={() => handleRoleSelection('listener')}
                        className='items-center  hover:scale-95 transition duration-300 w-[350px] xs:w-full flex text-xl xs:text-base leading-8 border border-dark100 rounded-[10px] py-6 px-8'>
                        <div className='w-8 h-8 xs:w-6 xs:h-6 bg-dark100 mr-6 rounded-full flex justify-center items-center'>
                            <img
                                className='w-[18px] h-[18px] xs:w-3 xs:h-3'
                                src={require('../icons/dedective.png')} alt="Detective Icon" />
                        </div>
                        <span className='font-semibold mr-1'> Dinləyici </span>
                        olaraq davam et
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
