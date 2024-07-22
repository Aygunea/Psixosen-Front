// // import React, { useState } from 'react';
// // import HistoryItem from './HistoryItem';
// // import { IoFilter } from "react-icons/io5";
// // import { FiDownload } from "react-icons/fi";

// // const History = () => {


// //   return (
// //     <div className='h-full grid grid-rows-[auto_1fr]'>
// //       <div className='pb-7 dark:bg-darkblack bg-lightwhite rounded-[10px] h-full overflow-hidden'>
// //         <div className='flex justify-between gap-4 pb-8'>
// //           <button className='flex items-center gap-[10px]'>
// //             <div className='w-7 h-7 dark:bg-darkgray bg-light200 dark:text-dark100 text-gray10 flex items-center justify-center'>
// //               <IoFilter />
// //             </div>
// //             <p className='dark:text-dark50  text-light50'> 25.06.2024</p>
// //           </button>
// //           <button
// //             className="bg-lightblue dark:bg-blue100 text-xs p-3 rounded-[10px] text-dark100 flex items-center gap-[10px]">
// //             <FiDownload />
// //             Hamısını yüklə
// //           </button>
// //         </div>
// //         <HistoryItem />
// //       </div>
// //     </div>
// //   );
// // };

// // export default History;


// // import React, { useRef } from 'react';
// // import HistoryItem from './HistoryItem';
// // import { IoFilter } from "react-icons/io5";
// // import { FiDownload } from "react-icons/fi";
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';

// // const History = () => {
// //   const tableRef = useRef();

// //   const downloadPDF = async () => {
// //     const input = tableRef.current;
// //     const canvas = await html2canvas(input);
// //     const imgData = canvas.toDataURL('image/png');
// //     const pdf = new jsPDF('p', 'mm', 'a4');
// //     const imgProps = pdf.getImageProperties(imgData);
// //     const pdfWidth = pdf.internal.pageSize.getWidth();
// //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
// //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
// //     pdf.save("table.pdf");
// //   };

// //   return (
// //     <div className='h-full grid grid-rows-[auto_1fr]'>
// //       <div className='pb-7 dark:bg-darkblack bg-lightwhite rounded-[10px] h-full overflow-hidden'>
// //         <div className='flex justify-between gap-4 pb-8'>
// //           <button className='flex items-center gap-[10px]'>
// //             <div className='w-7 h-7 dark:bg-darkgray bg-light200 dark:text-dark100 text-gray10 flex items-center justify-center'>
// //               <IoFilter />
// //             </div>
// //             <p className='dark:text-dark50 text-light50'> 25.06.2024</p>
// //           </button>
// //           <button
// //             onClick={downloadPDF}
// //             className="bg-lightblue dark:bg-blue100 text-xs p-3 rounded-[10px] text-dark100 flex items-center gap-[10px]">
// //             <FiDownload />
// //             Hamısını yüklə
// //           </button>
// //         </div>
// //         <div ref={tableRef}>
// //           <HistoryItem />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default History;

// // import React, { useRef } from 'react';
// // import HistoryItem from './HistoryItem';
// // import { IoFilter } from "react-icons/io5";
// // import { FiDownload } from "react-icons/fi";
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';

// import React, { useRef } from 'react';
// import HistoryItem from './HistoryItem';
// import { IoFilter } from "react-icons/io5";
// import { FiDownload } from "react-icons/fi";
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const History = () => {
//   const tableRef = useRef();

//   const downloadPDF = async () => {
//     const input = tableRef.current;
    
//     // Temporarily remove the dark mode class
//     document.documentElement.classList.remove('dark');

//     // Hide all buttons with the class 'hide-on-pdf'
//     const buttons = input.querySelectorAll('.hide-on-pdf');
//     buttons.forEach(button => {
//       button.style.display = 'none';
//     });

//     // html2canvas ile canvas oluştur
//     const canvas = await html2canvas(input, {
//       backgroundColor: '#ffffff', // Arkaplan rengi beyaz olarak ayarlandı
//       logging: true, // Konsola logları yazdır
//     });
//       // Add back the dark mode class
//       document.documentElement.classList.add('dark');


//     // Canvas'den base64 formatında resim verisini al
//     const imgData = canvas.toDataURL('image/png');

//     // jsPDF ile PDF oluştur
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save("table.pdf");

//     // Show the buttons again
//     buttons.forEach(button => {
//       button.style.display = 'block';
//     });
//   };

//   return (
//     <div className='h-full grid grid-rows-[auto_1fr]'>
//       <div className='pb-7 dark:bg-darkblack bg-lightwhite rounded-[10px] h-full overflow-hidden'>
//         <div className='flex justify-between gap-4 pb-8'>
//           <button className='flex items-center gap-[10px]'>
//             <div className='w-7 h-7 dark:bg-darkgray bg-light200 dark:text-dark100 text-gray10 flex items-center justify-center'>
//               <IoFilter />
//             </div>
//             <p className='dark:text-dark50 text-light50'> 25.06.2024</p>
//           </button>
//           <button
//             onClick={downloadPDF}
//             className="bg-lightblue dark:bg-blue100 text-xs p-3 rounded-[10px] text-dark100 flex items-center gap-[10px]">
//             <FiDownload />
//             Hamısını yüklə
//           </button>
//         </div>
//         <div ref={tableRef} className='max-h-[400px] overflow-y-auto scrollbar'>
//           <HistoryItem
//            />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;

import React, { useEffect, useRef, useState } from 'react';
import HistoryItem from './HistoryItem';
import { IoFilter } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const History = () => {
  const [sessions, setSessions] = useState([]);

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

    // html2canvas ile canvas oluştur
    const canvas = await html2canvas(input, {
      backgroundColor: '#ffffff', // Arkaplan rengi beyaz olarak ayarlandı
      logging: true, // Konsola logları yazdır
    });
    // Add back the dark mode class
    document.documentElement.classList.add('dark');


    // Canvas'den base64 formatında resim verisini al
    const imgData = canvas.toDataURL('image/png');

    // jsPDF ile PDF oluştur
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("table.pdf");

    // Show the buttons again
    buttons.forEach(button => {
      button.style.display = 'block';
    });
  };
  //get completed requests

  useEffect(() => {
    const fetchCompletedSessions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/sessions/completed-sessions');
        setSessions(response.data);
        console.log(sessions);
      } catch (error) {
        console.error('Error fetching completed sessions:', error);
      }
    };

    fetchCompletedSessions();
  }, []);

  return (
    <div className='h-full grid grid-rows-[auto_1fr]'>
      <div className='pb-7 dark:bg-darkblack bg-lightwhite rounded-[10px] h-full overflow-hidden'>
        <div className='flex justify-between gap-4 pb-8'>
          <button className='flex items-center gap-[10px]'>
            <div className='w-7 h-7 dark:bg-darkgray bg-light200 dark:text-dark100 text-gray10 flex items-center justify-center'>
              <IoFilter />
            </div>
            <p className='dark:text-dark50 text-light50'> 25.06.2024</p>
          </button>
          <button
            onClick={downloadPDF}
            className="bg-lightblue dark:bg-blue100 text-xs p-3 rounded-[10px] text-dark100 flex items-center gap-[10px]">
            <FiDownload />
            Hamısını yüklə
          </button>
        </div>
        {/* <div ref={tableRef} className='max-h-[400px] overflow-y-auto scrollbar'>
          {sessions.map((session, index) => (
            <HistoryItem
              key={index}
              duration={session.duration}
              price={session.price}
            />
          ))}
        </div> */}
        <div ref={tableRef} className='max-h-[400px] overflow-y-auto scrollbar'>
          <HistoryItem
           />
        </div>
      </div>
    </div>
  );
};

export default History;
