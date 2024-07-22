import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';
import axios from 'axios';

const Password = () => {
    const role = useSelector(state => state.role.role);
    const user = useSelector(state => state.user.user);
    const listener = useSelector(state => state.listener.listener);
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] = useState(null);
    const [doNewPasswordsMatch, setDoNewPasswordsMatch] = useState(null);
    const [forceShowCheck, setForceShowCheck] = useState(false);

    let userId;
    if (role === 'user') {
        userId = user._id;
    } else {
        userId = listener._id;
    }

    const toggleShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = async () => {
        const currentPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const confirmNewPassword = confirmPasswordRef.current.value;

        setForceShowCheck(newPassword.length > 0);

        if (newPassword && confirmNewPassword) {
            setDoNewPasswordsMatch(newPassword === confirmNewPassword);
        } else {
            setDoNewPasswordsMatch(null);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/verify-password', {
                role,
                userId,
                currentPassword,
            });

            setIsCurrentPasswordCorrect(response.data.isPasswordCorrect);
        } catch (err) {
            setIsCurrentPasswordCorrect(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const confirmNewPassword = confirmPasswordRef.current.value;

        try {
            const response = await axios.post('http://localhost:3000/api/auth/reset-password', {
                role,
                userId,
                currentPassword,
                newPassword,
                confirmNewPassword
            });

            setSuccess(response.data.message);
            setError('');
            oldPasswordRef.current.value = '';
            newPasswordRef.current.value = '';
            confirmPasswordRef.current.value = '';
        } catch (err) {
            console.error(err);
            setError(err.response.data.error || 'An error occurred');
            setSuccess('');
        }
    };

    return (
        <form className='flex flex-col gap-12 xs:gap-8 w-[428px] xs:w-full' onSubmit={handleSubmit}>
            <div className="relative">
                <Input
                    ref={oldPasswordRef}
                    label="Köhnə Şifrəniz"
                    placeholder="Köhnə şifrənizi daxil edin"
                    showPassword={showOldPassword}
                    showCheck={isCurrentPasswordCorrect}
                    toggleShowPassword={toggleShowOldPassword}
                    onChange={handleInputChange}
                >
                    <p className='xs:text-xs'>
                        {isCurrentPasswordCorrect === false && 'Yalnış şifrə. Yenidən sınayın və ya  İndi sıfırlayın.'}
                    </p>
                </Input>
            </div>
            <div className="relative">
                <Input
                    ref={newPasswordRef}
                    label="Yeni Şifrəniz"
                    placeholder="Yeni şifrənizi daxil edin"
                    showPassword={showNewPassword}
                    showCheck={null}
                    toggleShowPassword={toggleShowNewPassword}
                    onChange={handleInputChange}
                    forceShowCheck={forceShowCheck}
                />
            </div>
            <div className="relative">
                <Input
                    ref={confirmPasswordRef}
                    label="Şifrənizi Təsdiqləyin"
                    placeholder="Təkrar yeni şifrənizi daxil edin"
                    showPassword={showConfirmPassword}
                    showCheck={doNewPasswordsMatch}
                    toggleShowPassword={toggleShowConfirmPassword}
                    onChange={handleInputChange}
                >
                    <p className='xs:text-xs'>
                        {doNewPasswordsMatch === false && 'Şifrələr uyğun deyil. Yenidən daxil edin.'}
                    </p>
                </Input>
            </div>
            <button className='xs:text-sm dark:bg-dark300 bg-light200 dark:text-dark70 text-light70 p-3 rounded-[10px] w-full' style={{ letterSpacing: '0.5px' }}>
                Şifrənizi Dəyişdirin
            </button>
            {error && <div className='text-red-500 mt-4'>{error}</div>}
            {success && <div className='text-green-500 mt-4'>{success}</div>}
        </form>
    );
};

export default Password;
