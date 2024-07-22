import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Popup from '../Popup/Popup';

const RequestSpecific = () => {
    const [requests, setRequests] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState('');
    const closePopup = () => {
        setPopupVisible(false);
    };

    const getAllRequests = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/sessions');
            const data = await response.json();
            setRequests(data);
            console.log('Submitted Data:', data);
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
    ];

    const acceptRequest = async (_id) => {
        console.log(_id);
        try {
            const response = await axios.post(`http://localhost:3000/api/sessions/accept-request`, { _id });
            console.log('Submitted Data:', response.data);
            setPopupType('success');
            setPopupVisible(true);
        } catch (error) {
            console.error('Error submitting request:', error);
            setPopupType('failed');
            setPopupVisible(true);
        }
    }

    return (
        <>
            <table className='border-b border-light20 dark:border-darkgray text-center'>
                <thead>
                    <tr className='text-light text-lg font-medium border-b border-light20 dark:border-darkgray'>
                        {data.map((item, index) => (
                            <td
                                key={index}
                                className={`dark:text-dark100 text-gray10 text-base font-medium ${index === 0 ? 'w-[200px]' : 'w-[150px]'} py-[10px] border-b border-light20 dark:border-darkgray border-r`}
                            >
                                {item}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, rowIndex) => {
                        const createdAt = new Date(request.createdAt);
                        const timeString = createdAt.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
                        const dateString = createdAt.toLocaleDateString('az-AZ', { year: '2-digit', month: '2-digit', day: '2-digit' });

                        return (
                            <tr key={rowIndex}>
                                <td className='dark:text-dark100 text-gray10 text-base w-[200px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                    {request.userId?.username}
                                </td>
                                <td className='dark:text-dark100 text-gray10 text-base w-[150
                px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                                    {`${timeString} | ${dateString}`}
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
                                    {request.status === 'pending' ? 'gözləyir' : 'qəbul edildi '}
                                </td>
                                <td className='dark:text-dark100 text-gray10 text-base w-[184px] py-[11.5px] border-b border-light20 dark:border-darkgray'>
                                    {request.status == "accepted" ? (
                                        <div className='flex items-center gap-3 mx-3'>
                                            <button
                                                className='bg-gray-500 w-full rounded-[5px] py-2 text-sm text-dark100'>
                                                Başla
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center gap-3'>
                                            <button
                                                onClick={() => acceptRequest(request._id)}
                                                className='bg-green rounded-[5px] py-2 px-[10px] text-sm text-dark100'>
                                                Qəbul et
                                            </button>
                                            <button className='bg-blue100 rounded-[5px] py-2 px-[10px] text-sm text-dark100'>
                                                Təklif et
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {
                popupVisible && <Popup
                    message={popupType === 'success' ? "Siz təklifi qəbul etdiniz" :
                        "İstəyiniz uğursuz oldu. Zəhmət olmasa yenidən cəhd edin və ya dəstək xidmətimizlə əlaqə saxlayın."}
                    type={popupType}
                    onClose={closePopup} />
            }
        </>
    );
};

export default RequestSpecific;
