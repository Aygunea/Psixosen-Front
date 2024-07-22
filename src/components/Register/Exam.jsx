import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

const Exam = () => {
    return (
        <div>
            <p className='text-[40px] text-[#EAE7E5] mb-16 mt-[160px]'>
                İmtahan mərhələsinə keçid edin
            </p>
            <Link to="/quiz">
                <Button>
                    Başla
                </Button>
            </Link>
        </div>
    )
}

export default Exam
