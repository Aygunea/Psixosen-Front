import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Popup from '../Popup/Popup';
import { useNavigate } from 'react-router-dom';

const Final = () => {
    const navigate = useNavigate();
    //popup
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');

    const closePopup = () => {
        setPopupVisible(false);
        setTimeout(() => {
            navigate("/sign-in");
        }, 1000);
    };
    const form = useSelector(state => state.form.form)

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                setPopupType('failed');
                setPopupMessage(data.message);
                setPopupVisible(true);
                return;
            }
            if (response.ok) {
                setPopupType('success');
                setPopupMessage("Sizinlə ən qısa zamanda əlaqə saxlanılacaq");
                setPopupVisible(true);

            }
        } catch (error) {
            console.log(error);
            setPopupType('failed');
            setPopupMessage('Server xətası. Zəhmət olmasa yenidən cəhd edin.');
            setPopupVisible(true);
        }
    };
    return (
        <>
            <form onSubmit={handleSignup} className='flex items-center justify-center h-[400px] lg:w-[536px] w-full'>
                <button
                    type='submit'
                    className="w-full h-[60px] xs:h-[50px] bg-light200 text-darkblack font-medium text-xl xs:text-base mb-6 xs:mb-3 rounded-[10px] hover:scale-95 transition-all duration-200"
                >
                    Qeydiyyatı tamamla
                </button>

            </form>
            {
                popupVisible && <Popup
                    message={popupMessage}
                    type={popupType}
                    onClose={closePopup} />
            }
        </>
    )
}

export default Final