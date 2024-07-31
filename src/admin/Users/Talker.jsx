import React, { useEffect, useState } from 'react';

const Talker = () => {
    const [talkers, setTalkers] = useState([]);

    const getAllTalkers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            const data = await response.json();
            setTalkers(data);
            console.log('Submitted Data:', data);
        } catch (error) {
            console.error('Error getting all requests:', error);
        }
    };

    useEffect(() => {
        getAllTalkers();
    }, []);

    const headers = [
        'Danışan',
        'Qeydiyyat Tarixi',
        'Əməliyyat'
    ];
    const formatDate = (date) => {
        if (!date) return { dateString: '' };
        const formattedTime = new Date(date);
        const day = formattedTime.getDate().toString().padStart(2, '0');
        const month = (formattedTime.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedTime.getFullYear().toString().slice(-4);
        const dateString = `${day}.${month}.${year}`;
        return { dateString };
    };
    return (
        <div>
            {talkers.length > 0 ? (
                <table className='border-b border-darkgray text-center w-full'>
                    <thead>
                        <tr className='border-b border-darkgray'>
                            {headers.map((header, index) => (
                                <th key={index}
                                    className={`text-gray10 text-base font-medium py-[10px] border-b border-darkgray ${index !== headers.length - 1 ? 'border-r' : ''}`}                                 >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {talkers.map((talker, rowIndex) => {
                             const { dateString } = formatDate(talker.createdAt);
                            return (
                                <tr key={rowIndex} className='w-full'>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                        {talker.username}
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                        {dateString}
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <button className='bg-redlight300  rounded-[5px] py-2 px-[10px] text-sm text-dark100'>
                                                Deaktiv et
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : <p className='text-lg text-gray10'>Danışan yoxdur</p>}
        </div>
    );
};

export default Talker;
