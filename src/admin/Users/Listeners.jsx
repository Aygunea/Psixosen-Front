import React, { useEffect, useState } from 'react';

const Listeners = () => {
    const [listeners, setListeners] = useState([]);

    const getAllListeners = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/listeners');
            const data = await response.json();
            setListeners(data);
            console.log('Submitted Data:', data);
        } catch (error) {
            console.error('Error getting all requests:', error);
        }
    };

    useEffect(() => {
        getAllListeners();
    }, []);

    const headers = [
        'Dinləyici',
        'Qeydiyyat Tarixi',
        'Telefon',
        'Balans',
        'Reytinq',
        'Əməliyyat'
    ];

    return (
        <div>
            {listeners.length > 0 ? (
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
                        {listeners.map((listener, rowIndex) => {
                            const createdAt = new Date(listener.createdAt);
                            const dateString = createdAt.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: '2-digit' });

                            return (
                                <tr key={rowIndex} className='w-full'>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                        {listener.username}
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                        {dateString}
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                        {listener.phone}
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                        {listener.balance} Azn
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                       4.5
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <button className='bg-redlight300 rounded-[5px] py-2 px-[10px] text-sm text-dark100'>
                                                Deaktiv et
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : <p className='text-lg text-gray10'>Dinləyici yoxdur</p>}
        </div>
    );
};

export default Listeners;
