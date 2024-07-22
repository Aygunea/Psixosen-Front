import React, { useEffect, useState } from 'react';

const Suggest = () => {
  const [suggests, setSuggests] = useState([]);

  useEffect(() => {
    const fetchSuggests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/suggest');
        const data = await response.json();
        setSuggests(data);
      } catch (error) {
        console.error('Error fetching suggests:', error);
      }
    };

    fetchSuggests();
  }, []); 

  return (
    <div className='py-6 flex flex-col gap-8 xs:gap-6'>
      {suggests.length > 0 ? (
        suggests.map((suggest) => {
          const createdAt = new Date(suggest.createdAt);
          const timeString = createdAt.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
          const dateString = createdAt.toLocaleDateString('az-AZ', { year: '2-digit', month: '2-digit', day: '2-digit' });
          return (
            <div
              key={suggest._id}
              className='bg-lightgray py-4 px-8 rounded-[10px] flex justify-between transition duration-1000'
            >
              <div className='w-full'>
                <div className="flex items-center justify-end">
                  <p className='text-dark50 text-sm'>
                  {`${timeString} | ${dateString}`}
                  </p>
                </div>
                <p className='text-gray10 text-lg'>
                  {suggest.description}
                </p>
                <p className='text-sm text-light50'>
                  İstifadəçi adı: {suggest.userId?.username}
                </p>
              </div>
            </div>
          )
        })
      ) : (
        <p className='text-xl dark:text-dark100 text-gray10'>
          Təklif yoxdur
        </p>
      )}
    </div>
  );
};

export default Suggest;
