import React from 'react'

const Head = ({ activeTab, setActiveTab }) => {
    return (
        <div className='xs:mx-6 flex items-center gap-3 xs:gap-2 xs:border-none  border-r dark:border-dark20 border-light20'>
            <button
                onClick={() => setActiveTab('Söhbətlər')}
                className={`text-lg xs:text-base font-medium px-[24.5px] xs:px-4 py-[10px] rounded-[5px] ${activeTab === 'Söhbətlər' ? 'text-darkgray dark:text-dark100 bg-light20 dark:bg-gray10 xs:dark:bg-darkgray xs:bg-light200 xs:text-gray10' :
                    'text-light50 dark:text-dark70'
                    }`}>
                Söhbətlər
            </button>
            <button
                onClick={() => setActiveTab('Qruplar')}
                className={`text-lg xs:text-base font-medium px-[24.5px] xs:px-4 py-[10px] rounded-[5px] ${activeTab === 'Qruplar' ? 'text-darkgray dark:text-dark100 bg-light20 dark:bg-gray10 xs:dark:bg-darkgray xs:bg-light200 xs:text-gray10' : 'text-light50 dark:text-dark70'
                    }`}>
                Qruplar
            </button>
        </div>
    )
}

export default Head
