import React, { useEffect, useRef, useState } from 'react';
import { FiDownload } from "react-icons/fi";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';

const History = () => {
  const [completedSessions, setCompletedSessions] = useState([]);
  const role = useSelector(state => state.role.role)
  const tableRef = useRef();
  const downloadPDF = async () => {
    const input = tableRef.current;
    // Temporarily remove the dark mode class
    document.documentElement.classList.remove('dark');

    // Hide all buttons with the class 'hide-on-pdf'
    const buttons = input.querySelectorAll('.hide-on-pdf');
    buttons.forEach(button => {
      button.style.display = 'none';
    });

    // html2canvas ile canvas 
    const canvas = await html2canvas(input, {
      backgroundColor: '#ffffff',
      logging: true,
    });
    // Add back the dark mode class
    document.documentElement.classList.add('dark');
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("table.pdf");

    buttons.forEach(button => {
      button.style.display = 'block';
    });
  };
  useEffect(() => {
    const fetchCompletedSessions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sessions/completed-sessions');
        const data = await response.json();
        if (response.ok) {
          setCompletedSessions(data)
        }
      } catch (error) {
        console.error('Error fetching completed sessions:', error);
      }
    };

    fetchCompletedSessions();
  }, []);
  const data = [
    role === 'user' ? 'Dinləyici' : 'Danışan',
    'Müraciət tarixi',
    'Müddət',
    'Mövzu',
    'Məbləğ',
    'Status',
  ];
  const formatDate = (sessionStartTime) => {
    if (!sessionStartTime) return { dateString: '', timeString: '' };
    const formattedTime = new Date(sessionStartTime);
    const day = formattedTime.getDate().toString().padStart(2, '0');
    const month = (formattedTime.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedTime.getFullYear().toString().slice(-2);
    const dateString = `${day}.${month}.${year}`;
    const timeString = formattedTime.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', hour12: false });
    return { dateString, timeString };
  };

  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
      {completedSessions.length > 0 ? (
        <div className='pb-7 lg:dark:bg-darkblack lg:bg-lightwhite rounded-[10px] h-full overflow-hidden'>
          <div className='flex justify-end gap-4 pb-8'>
            <button
              onClick={downloadPDF}
              className="bg-lightblue dark:bg-blue100 lg:text-xs text-[10px] p-3 rounded-[10px] text-dark100 flex items-center gap-[10px]">
              <FiDownload />
              Hamısını yüklə
            </button>
          </div>
          <div ref={tableRef} className='h-full overflow-y-auto scrollbar'>

            <div className='mr-3'>
              <table className='md:table hidden w-full text-center'>
                <thead className='w-full'>
                  <tr
                    style={{ letterSpacing: "0.3px" }}
                    className='border-b border-light20 w-full dark:border-darkgray grid grid-cols-[1fr_1.5fr_1fr_1.5fr_1fr_1fr]'>
                    {data.map((item, index) => (
                      <td key={index}
                        className={`dark:text-dark100 text-gray10 text-xs sm:text-sm xl:text-base font-medium py-[10px] ${index !== data.length - 1 ? 'border-r border-light20 dark:border-darkgray' : ''} `}
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className='text-xs sm:text-sm xl:text-base dark:text-dark100 text-gray10 w-full'>
                  {completedSessions.map((session, rowIndex) => {
                    const { dateString, timeString } = formatDate(session.createdAt);
                    return (
                      <tr key={rowIndex} className='w-full grid grid-cols-[1fr_1.5fr_1fr_1.5fr_1fr_1fr]'>
                        <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                          {role === 'user' ? session.listenerId.nickname : session.userId.username}
                        </td>
                        <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                          {dateString && timeString ? `${dateString} | ${timeString}` : ''}
                        </td>
                        <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                          {session.duration}
                        </td>
                        <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                          {session.topic}
                        </td>
                        <td className='py-[11.5px] border-b border-light20 dark:border-darkgray border-r'>
                          {session.price} Azn
                        </td>
                        <td className='py-[11.5px] border-b border-light20 dark:border-darkgray'>
                          {session.status}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className='flex flex-col gap-4'>
                {completedSessions.map((session, rowIndex) => {
                  const { dateString, timeString } = formatDate(session.createdAt);
                  return (
                    <div key={rowIndex} className="flex justify-between border dark:border-dark20 border-ligh20 py-3 px-4 rounded-[5px] md:hidden
                   hover:dark:bg-darkgray hover:bg-lightgray">
                      <div className="flex flex-col gap-[2px]">
                        <div className='text-sm dark:text-dark100 text-gray10'>
                          {role === 'user' ? session.listenerId.nickname : session.userId.username}
                        </div>
                        <div className='text-xs sm:text-sm dark:text-dark70 text-light70'>
                          {dateString && timeString ? `${dateString} | ${timeString}` : ''}
                        </div>
                      </div>
                      <div className="flex flex-col gap-[2px] dark:text-dark100 text-gray10">
                        <div className='text-sm xxs:text-[10px]'>
                          {session.topic}
                        </div>
                        <div className='text-xs sm:text-sm'>
                          {session.duration} / {session.price} Azn
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>):<div className="dark:text-dark100 text-gray10">Tarixçə boşdur</div>}
    </div>
  );
};

export default History;
