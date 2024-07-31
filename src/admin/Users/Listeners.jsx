import React, { useEffect, useState } from 'react';

const Listeners = () => {
    const [listeners, setListeners] = useState([]);

    const toggleListenerActivation = async (listenerId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/listeners/activate/${listenerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }
            setListeners((prevListeners) => 
                prevListeners.map(listener => 
                    listener._id === listenerId ? { ...listener, isActive: !listener.isActive } : listener
                )
            );
            console.log("Dinleyici aktiv edildi:", data);
        } catch (error) {
            console.error("Dinleyici aktiv edilmedi xetasi:", error);
        }
    };

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
        'E-poçt ünvanı',
        'Kateqoriya',
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
                            const { dateString } = formatDate(listener.createdAt);
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
                                        {listener.email}
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray border-r'>
                                        {listener.fieldOfActivity}
                                    </td>
                                    <td className='text-gray10 text-base py-[11.5px] border-b border-darkgray'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <button
                                                onClick={() => toggleListenerActivation(listener._id)}
                                                className='bg-redlight300 rounded-[5px] py-2 px-[10px] text-sm text-dark100'>
                                                {listener.isActive ? "deaktiv et" : "aktiv et"}
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
