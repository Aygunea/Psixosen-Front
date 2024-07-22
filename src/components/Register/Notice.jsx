import React from 'react'
import Button from '../Button/Button'

const Notice = ({ score }) => {
    return (
        <div className="min-h-[100vh] flex justify-center items-center bg-dark">
            <div className="container mx-auto flex justify-center items-center flex-col text-dark100">
                <h3 className='text-5xl leading-[72px] mb-6'>Nəticə</h3>
                <h3 className='text-5xl mb-[100px]'>{score}%</h3>
                <div className="text-center flex gap-5 flex-col text-2xl mb-[140px]">
                    <p className='font-semibold'>İmtahanda iştirak etdiyiniz üçün təşəkkür edirik!</p>
                    <p className='text-xl'>Əməkdaşlarımız tərəfindən sizinlə ən qısa müddətdə əlaqə saxlanılacaqdır.</p>
                </div>
                <div className='w-[536px]'>
                    <Button>
                        Qeydiyyatı Tamamla
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Notice