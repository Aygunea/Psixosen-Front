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
        <div className="w-full">
            {talkers.length > 0 ? (
                <div className='w-full'>
                    <table className='md:table hidden w-full border-darkgray text-center'>
                        <thead className='w-full'>
                            <tr className='border-b border-darkgray w-full grid grid-cols-3'>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className={`text-gray10 text-base font-medium py-[10px] border-darkgray ${index !== headers.length - 1 ? 'border-r' : ''}`}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='w-full'>
                            {talkers.map((talker, rowIndex) => {
                                const { dateString } = formatDate(talker.createdAt);
                                return (
                                    <tr key={rowIndex} className='border-b border-darkgray w-full grid grid-cols-3'>
                                        <td className='text-gray10 text-base py-[11.5px] border-r border-darkgray'>
                                            {talker.username}
                                        </td>
                                        <td className='text-gray10 text-base py-[11.5px] border-r border-darkgray'>
                                            {dateString}
                                        </td>
                                        <td className='text-gray10 text-base py-[11.5px]'>
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
                    <div className='flex flex-col md:hidden gap-4'>
                        {talkers.map((talker, rowIndex) => {
                            const { dateString } = formatDate(talker.createdAt);
                            return (
                                <div key={rowIndex} className="flex justify-between border border-ligh20 py-3 px-4 rounded-[5px] md:hidden
                                  hover:bg-lightgray">
                                    <div className="grid grid-rows-2 gap-4">
                                        <div className='grid grid-cols-2 gap-6'>
                                            <div className='text-xs sm:text-sm text-light70'>Danışan</div>
                                            <div className='text-sm  text-gray10'>  {talker.username}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className='text-xs sm:text-sm text-light70'>Qeydiyyat Tarixi</div>
                                            <div className='text-xs sm:text-sm text-light70'>
                                                {dateString}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : <p className='text-lg text-gray10'>Danışan yoxdur</p>}
        </div>
    );
};

export default Talker;
