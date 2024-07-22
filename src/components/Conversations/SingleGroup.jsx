import React from 'react'

const SingleGroup = () => {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-[#ffffff33] py-4">
            {/* Left */}
            <div className="h-12 w-12 bg-dark70 text-dark500 rounded-full overflow-hidden uppercase flex justify-center items-center">
                AD
            </div>
            {/* Right */}
            <div className="flex flex-col ">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm text-dark100 mb-[6px]">Əjdahalar Sülaləsi</h4>
                    <p className='text-dark50 text-xs'>13.36</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className='text-dark50 text-xs'>Hahaha</p>
                    <div className='w-3 h-3 rounded-full bg-green text-darkblack text-[8px] flex items-center justify-center'>
                        12
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SingleGroup
