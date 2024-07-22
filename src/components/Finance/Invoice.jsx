import React from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Invoice = () => {
    const paymentTitle = [
        'Faktura',
        'Tarix',
        'Məbləğ',
        'Status',
        'Təsvir'
    ];
    const data = [
        'Psixosen',
        '08.06.2024',
        '30 AZN',
        'Gözləyən',
        'Məxaric',
    ];

    return (
        <table className='bg-light200 dark:bg-gray10 text-center mt-4 w-full table-fixed rounded-[5px]'>
            <thead>
                <tr className='text-gray10 dark:text-dark100 text-base font-medium'>
                    {paymentTitle.map((item, index) => (
                        <td key={index} className='w-1/5 p-[10px]'>
                            <div className='flex items-center justify-center gap-[10px]'>
                                <p>{item}</p>
                                <div className='flex w-5 h-6 flex-col text-light50 dark:text-dark50'>
                                    <IoIosArrowUp />
                                    <IoIosArrowDown />
                                </div>
                            </div>
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody className='bg-lightgray dark:bg-gray20'>
                {[...Array(2)].map((_, rowIndex) => (
                    <tr key={rowIndex} className={`border-light20 dark:border-dark20 p-[10px] ${rowIndex !== 1 ? 'border-b' : ''}`}>
                        {data.map((item, index) => (
                            <td key={index} className='text-light50 dark:text-dark50 text-base w-1/5 py-3'>
                                {item}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Invoice;
