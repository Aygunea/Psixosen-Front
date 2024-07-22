import React from 'react'
import { MdOutlineStar } from 'react-icons/md'

const Rating = () => {
    return (
        <div className='bg-lightgray dark:bg-dark300 flex xs:flex-col gap-8 xs:gap-2 p-4 rounded-[10px] xs:rounded-[5px]'>
            <p className='text-sm xs:text-xs dark:text-dark100 text-gray10'>
                "Çox faydalı seans! Psixoloqun məni anlamağa çalışması və doğru yolda olmağım üçün göstərdiyi dəstək inanılmaz idi. Onunla danışdıqca özümü daha rahat hiss etdim və problemlərimi daha yaxşı başa düşdüm. Hər kəsə tövsiyə edirəm!"
            </p>
            <div className='flex items-center gap-2'>
                <p className='text-light50 dark:text-dark50 font-medium text-sm xs:text-xs'>4.5</p>
                <MdOutlineStar className='text-base xs:text-sm text-light50 dark:text-dark50' />
            </div>
        </div>
    )
}

export default Rating