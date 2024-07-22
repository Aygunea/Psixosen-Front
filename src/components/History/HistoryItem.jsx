import React from 'react';

const HistoryItem = ({ duration, price }) => {
  const request = [
    'Intiqam Məmmədov',
    '25.06.2024 | 15:00',
    '30',
    'Stress və Narahatlıqla Mübarizə',
    '30',
  ];
  const data = [
    'İstifadəçi məlumatları',
    'Tarix',
    'Müddət',
    'Mövzu',
    'Məbləğ',
  ];

  const requests = new Array(5).fill({
    userId: { username: request[0] },
    createdAt: request[1],
    duration: request[2],
    topic: request[3],
    price: request[4]
  });

  return (
    // <div className='overflow-y-auto scrollbar h-full'>
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
      {/* <tbody>
        <tr>
          <td className='dark:text-dark100 text-gray10 text-sm w-[200px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
            {request.userId?.username}
          </td>
          <td className='dark:text-dark100 text-gray10 text-sm w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
            {request.createdAt}
          </td>
          <td className='dark:text-dark100 text-gray10 text-sm w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
            {duration}
          </td>
          <td className='dark:text-dark100 text-gray10 text-sm w-[250px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
            {request.topic}
          </td>
          <td className='dark:text-dark100 text-gray10 text-sm w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
            {price} Azn
          </td>
          <td className='dark:text-dark100 text-gray10 text-sm w-[100px] py-[11.5px] border-b border-light20 dark:border-darkgray'>
            <div className='flex justify-center items-center gap-3'>
              <button className='hide-on-pdf bg-red300 rounded-[5px] py-1 px-6 text-sm text-dark100'>
                Sil
              </button>
            </div>
          </td>
        </tr>
      </tbody> */}
      <tbody>
          {requests.map((request, rowIndex) => (
            <tr key={rowIndex}>
              <td className='dark:text-dark100 text-gray10 text-sm w-[250px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                {request.userId?.username}
              </td>
              <td className='dark:text-dark100 text-gray10 text-sm w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                {request.createdAt}
              </td>
              <td className='dark:text-dark100 text-gray10 text-sm w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                {request.duration}
              </td>
              <td className='dark:text-dark100 text-gray10 text-sm w-[300px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                {request.topic}
              </td>
              <td className='dark:text-dark100 text-gray10 text-sm w-[150px] py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                {request.price} Azn
              </td>
              <td className='dark:text-dark100 text-gray10 text-sm w-[100px] py-[11.5px] border-b border-light20 dark:border-darkgray'>
                <div className='flex justify-center items-center gap-3'>
                  <button className='hide-on-pdf bg-red300 rounded-[5px] py-1 px-6 text-sm text-dark100'>
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    // </div>
  );
};

export default HistoryItem;
