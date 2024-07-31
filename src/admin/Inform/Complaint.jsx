import React, { useEffect, useState } from 'react';

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/complaints');
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []); 
  const formatDate = (time) => {
    if (!time) return { dateString: '', timeString: '' };
    const formattedTime = new Date(time);
    const day = formattedTime.getDate().toString().padStart(2, '0');
    const month = (formattedTime.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedTime.getFullYear().toString().slice(-2);
    const dateString = `${day}.${month}.${year}`;
    const timeString = formattedTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { dateString, timeString };
  };
  return (
    <div className='py-6 flex flex-col gap-8 xs:gap-6'>
      {complaints.length > 0 ? (
        complaints.map((complaint) => {
          const { dateString, timeString } = formatDate(complaint.createdAt);
          return (
            <div
              key={complaint._id}
              className='bg-lightgray py-4 px-8 rounded-[10px] flex justify-between transition duration-1000'
            >
              <div className='w-full'>
                <div className="flex items-center justify-between mb-2">
                  <p className='text-gray10 text-lg font-medium'>
                    {complaint.title}
                  </p>
                  <p className='text-dark50 text-sm'>
                    {`${timeString} | ${dateString}`}
                  </p>
                </div>
                <p className='text-light70 text-base'>
                  {complaint.description}
                </p>
                <div className="flex gap-16 items-center text-base text-light50 mt-[6px]">
                  <p>
                    Şikayətçi:  {complaint.complainantUsername}
                  </p>
                  <p>
                    Şikayət olunan şəxs: {complaint.complainedAboutUsername}
                  </p>
                </div>

              </div>
            </div>
          )
        })
      ) : (
        <p className='text-xl dark:text-dark100 text-gray10'>
          Şikayət yoxdur
        </p>
      )}
    </div>
  );
};

export default Complaint;
