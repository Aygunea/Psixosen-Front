import React from 'react'

const PrivateChat = () => {
    return (
        <div className='text-gray10 dark:text-dark100 flex flex-col items-center justify-center text-sm mt-[70px]'>
            <p className='mb-3 text-base'>Gizli Mesaj Rejimi</p>
            <p className='text-sm'>Söhbəti bağladığınız zaman görünən mesajlar yox olacaq.</p>
            <a className='text-lightblue text-sm'  href="">
                Daha ətraflı.
            </a>
        </div>
    )
}

export default PrivateChat