import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RequestUser = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    const [requests, setRequests] = useState([]);

    const getAllRequests = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/sessions');
            const data = await response.json();
            setRequests(data);
            // console.log('Submitted Data:', data);
        } catch (error) {
            console.error('Error getting all requests:', error);
        }
    };

    useEffect(() => {
        getAllRequests();
    }, []);
    const data = [
        'Müraciətçi',
        'Tarix',
        'Müddət',
        'Kateqoriya',
        'Məbləğ',
        'Status',
    ]

    const acceptRequest = async (_id) => {
        console.log(_id);
        try {
            const response = await axios.post(`http://localhost:3000/api/sessions/accept-request`, { _id });
            console.log(response);
            console.log('Submitted Data:', response.data);
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    }
    return (
        <div className='flex flex-col gap-8'>
            <div className='dark:bg-dark300 bg-dark100 flex justify-between mt-[21px] px-8'>
                <div className='flex flex-col py-[17px]'>
                    <div className='pr-[160px]'>
                        <p className='dark:text-dark100 text-gray10 text-2xl mb-[10px]'>Anonim Dinləyici Çatı</p>
                        <div className='dark:text-dark70 text-light70 mb-4'>
                            Təsadüfi mütəxəssis seçimi əsasında Anonim Dinləyici Çatını başlatmaq  üçün
                            <span>“Müraciət et”</span>
                            düyməsinə klikləyin.
                        </div>
                    </div>
                    <Link to="../poolrequest">
                        <div className="flex justify-end">
                            <button
                                className='w-[173px] dark:bg-blue100 bg-lightblue text-sm text-dark100 py-[11px] rounded-[10px]'>
                                Müraciət Et
                            </button>
                        </div>
                    </Link>
                </div>
                {darkMode ? <img
                    className='w-[92px]'
                    src={require('../../images/icons.png')} alt="" /> :
                    <img
                        className='w-[92px]'
                        src={require('../../images/iconslight.png')} alt="" />}
            </div>
            <div>
                {requests.length > 0 ? (
                    <table className='border-b border-light20 dark:border-darkgray text-center'>
                        <thead>
                            <tr
                                style={{ letterSpacing: "0.3px" }}
                                className='border-b border-light20 dark:border-darkgray'>
                                {data.map((item, index) => (
                                    <td key={index}
                                        className={`dark:text-dark100 text-gray10 text-base font-medium ${index === 0 ? 'w-[200px]' : 'w-[150px]'} py-[10px] border-b border-light20 dark:border-darkgray border-r`}
                                    >
                                        {item}
                                    </td>

                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className='dark:text-dark100 text-gray10 text-base w-[200px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                        {request.userId?.username}
                                    </td>
                                    <td className='dark:text-dark100 text-gray10 text-base w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                        {new Date(request.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className='dark:text-dark100 text-gray10 text-base w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                        {request.duration}
                                    </td>
                                    <td className='dark:text-dark100 text-gray10 text-base w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                        {request.topic}
                                    </td>
                                    <td className='dark:text-dark100 text-gray10 text-base w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                        {request.price} Azn
                                    </td>
                                    <td className='dark:text-dark100 text-gray10 text-base w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                        {request.status}
                                    </td>
                                    <td className='dark:text-dark100 text-gray10 text-base w-[184px] py-[11.5px] border-b border-light20 dark:border-darkgray'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <button
                                                // onClick={() => acceptRequest(request._id)}
                                                className='bg-green rounded-[5px] py-2 px-[10px] text-sm text-dark100'>
                                                Qəbul et
                                            </button>
                                            <button className='bg-blue100 rounded-[5px] py-2 px-[10px] text-sm text-dark100'>
                                                Təklif et
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                ) : <p className='text-lg dark:text-dark100 text-gray10'>Müraciət yoxdur</p>}
            </div>
        </div>

    )
}

export default RequestUser
