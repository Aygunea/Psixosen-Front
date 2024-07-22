import React, { useEffect, useRef, useState } from 'react'
import { RiEdit2Line } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import { PiMoon } from "react-icons/pi";
import { toggleTheme } from '../../slices/theme.slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setListener } from '../../slices/listener.slice';
import { setUser } from '../../slices/userSlice';
import { FiLogOut } from "react-icons/fi";
import axios from 'axios';
import Rating from './Rating';


const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const role = useSelector((state) => state.role.role);
  const listener = useSelector((state) => state.listener?.listener);
  const user = useSelector((state) => state.user?.user);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ name: 'Qaranlıq', icon: <PiMoon /> });
  const titleRef = useRef(null);
  const themes = [
    { name: 'Qaranlıq', icon: <PiMoon /> },
    { name: 'İşıqlı', icon: <LuSun /> }
  ]
  const handleSelect = (category) => {
    setSelectedValue(category);
    setIsOpen(false);
    dispatch(toggleTheme());
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [isEditing, setIsEditing] = useState(false);

  const nicknameRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const userNicknameRef = useRef()
  const userEmailRef = useRef()

  const name = listener?.username.split(" ")[0];
  const surname = listener?.username.split(" ")[1];

  const logout = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/api/auth/logout")
      if (role === "user") {
        dispatch(setUser(''))
        sessionStorage.removeItem("user");
      }
      if (role === "listener") {
        dispatch(setListener(''))
        sessionStorage.removeItem("listener");
      }
      navigate("/")
    } catch (error) {
      console.log("Fetch error " + error);
    }
  }

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }
  useEffect(() => {
    if (isEditing) {
      nicknameRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    const updatedData = {
      nickname: nicknameRef.current.value,
      username: `${nameRef.current.value} ${surnameRef.current.value}`,
      email: emailRef.current.value,
      phone: phoneRef.current.value
    };
    console.log(updatedData);
    try {
      const response = await fetch(`http://localhost:3000/api/listeners`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();
      console.log('Updated Data:', data);

      if (response.ok) {
        dispatch(setListener(data));
        setIsEditing(false);
      } else {
        console.error('Error updating listener:', data.message);
      }
    } catch (error) {
      console.error('Error updating listener:', error);
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      {role === "user" && (
        <>
          <div className='flex flex-col gap-4'>
            <p className='dark:text-dark100 text-gray10 text-base font-medium'>İstifadəçi</p>
            <div className="flex items-center gap-6">
              <img
                src={user.profilePic} alt="Icon"
                className="w-14 h-14 rounded-full opacity-80"
              />
              <div className='flex flex-col gap-1'>
                <input
                  ref={userNicknameRef}
                  className={`dark:text-dark100 text-gray10 text-base text-medium bg-transparent border-none outline-none`}
                  type="text"
                  defaultValue={user.username}
                />
                <p className='dark:text-dark50 text-light50 text-sm'>danışan</p>
              </div>
            </div>
          </div>
          {/* step 2  */}
          <div className="flex flex-col gap-6 w-full">
            <p className='dark:text-dark100 text-gray10 text-base font-medium'>Şəxsi Məlumat</p>
            <div className="flex flex-col gap-6  xs:w-full w-[428px]">
              <div className='flex flex-col gap-3'>
                <label className='dark:text-dark50 text-light50 text-sm'>Ləqəb:</label>
                <input
                  defaultValue={user.username}
                  ref={userNicknameRef}
                  readOnly
                  className='rounded-[5px] p-[10px] dark:text-dark100 text-gray10 text-sm bg-transparent border dark:border-dark20 border-light20 outline-none'
                  type="text" />
              </div>
              <div className='flex flex-col gap-3'>
                <label className='dark:text-dark50 text-light50 text-sm'>E-poçt ünvanı:</label>
                <input
                  ref={userEmailRef}
                  readOnly
                  className='rounded-[5px] p-[10px] dark:text-dark100 text-gray10 text-sm bg-transparent border dark:border-dark20 border-light20 outline-none'
                  type="text" defaultValue={user.email} />
              </div>
            </div>
          </div>
          <div className="sm:hidden xs:flex flex-col gap-4">
            <label className='dark:text-dark50 text-light50 text-sm'>
              Tətbiqin rəng mövzusu:
            </label>
            <div className="relative ">
              <input
                id="theme"
                type="text"
                onClick={handleToggle}
                value={selectedValue.name}
                readOnly
                ref={titleRef}
                className="w-full h-[60px] xs:h-[42px] text-sm xs:px-4 px-6 xs:pl-9 bg-transparent border dark:border-dark20 border-light20 outline-none text-light70 dark:text-dark100 rounded-[10px] xs:rounded-[5px]"
              />
              <div className='absolute top-1/2 -translate-y-1/2 left-3 dark:text-dark100'>
                {selectedValue.icon}
              </div>
              <FaChevronDown className={`absolute top-1/2 -translate-y-1/2 right-4 xs:text-xs dark:text-dark100 text-dark70 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
              <ul className="mt-3 xs:mt-0 text-light70 dark:text-dark100 border dark:border-dark20 border-light20 bg-transparent text-base xs:text-sm rounded-[10px] xs:rounded-[5px]">
                {themes.map((category, index) => (
                  <li key={index}
                    onClick={() => handleSelect(category)}
                    className={`flex items-center gap-2 px-6 xs:px-3 py-3 cursor-pointer border-light20 dark:border-dark20 ${index !== themes.length - 1 ? 'border-b' : ''}`}>
                    <div>
                    {category.icon}
                    </div>
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={logout}
            className='flex items-center justify-center gap-[10px] p-[10px] rounded-[5px] bg-redlight300 dark:bg-reddark300 text-dark100 w-[215px] xs:w-full xs:text-xs'>
            Hesabdan Çıx
            <FiLogOut />
          </button>
        </>
      )}
      {listener && (
        <div className='flex flex-col gap-8'>
          {/* step 1 */}
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-4'>
              <p className='dark:text-dark100 text-gray10 text-base font-medium'>İstifadəçi</p>
              <div className="flex items-center gap-6">
                <img
                  src={require('../../images/profilePic.jpeg')} alt="Icon"
                  className="w-14 h-14 rounded-full dark:opacity-60 opacity-80"
                />
                <div className='flex flex-col gap-1'>
                  <input
                    ref={nicknameRef}
                    className={`dark:text-dark100 text-gray10 text-base text-medium bg-transparent border-none outline-none ${isEditing && 'outline-auto'}`}
                    type="text"
                    readOnly={!isEditing}
                    defaultValue={listener.nickname}
                  />
                  <p className='dark:text-dark50 text-light50 text-sm'>{listener.fieldOfActivity}</p>
                </div>
              </div>
            </div>

            <button
              onClick={isEditing ? handleSave : handleEdit}
              className='w-max h-max text-sm dark:border-dark50 border-light50 dark:text-dark100 text-gray10 border-[1.5px] flex items-center justify-center gap-2 py-[9.5px] px-3 rounded-[31px]'>
              {isEditing ? 'Yadda saxla' : 'Redaktə et'}
              <RiEdit2Line />
            </button>
          </div>
          {/* step 2  */}
          <div className='flex justify-between'>
            <div className="flex flex-col gap-6 w-full">
              <p className='dark:text-dark100 text-gray10 text-base font-medium'>Şəxsi Məlumat</p>
              <div className='flex justify-between w-full'>
                {/* left */}
                <div className="flex flex-col gap-6  xs:w-full w-[428px]">
                  <div className='flex flex-col gap-3'>
                    <label className='dark:text-dark50 text-light50 text-sm'>Ad:</label>
                    <input
                      ref={nameRef}
                      className='rounded-[5px] p-[10px] dark:text-dark100 text-gray10 text-sm bg-transparent border dark:border-dark20 border-light20 outline-none'
                      type="text" readOnly={!isEditing} defaultValue={name} />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <label className='dark:text-dark50 text-light50 text-sm'>E-poçt ünvanı:</label>
                    <input
                      ref={emailRef}
                      className='rounded-[5px] p-[10px] dark:text-dark100 text-gray10 text-sm bg-transparent border dark:border-dark20 border-light20 outline-none'
                      type="text" readOnly={!isEditing} defaultValue={listener.email} />
                  </div>
                </div>
                {/* right */}
                <div className="flex flex-col gap-6 xs:w-full w-[428px]">
                  <div className='flex flex-col gap-3'>
                    <label className='dark:text-dark50 text-light50 text-sm'>Soyad:</label>
                    <input
                      ref={surnameRef}
                      className='rounded-[5px] p-[10px] dark:text-dark100 text-gray10 text-sm bg-transparent border dark:border-dark20 border-light20 outline-none'
                      type="text" readOnly={!isEditing} defaultValue={surname} />
                  </div>
                  <div className='flex flex-col gap-3'>
                    <label className='dark:text-dark50 text-light50 text-sm'>Telefon:</label>
                    <input
                      ref={phoneRef}
                      className='rounded-[5px] p-[10px] dark:text-dark100 text-gray10 text-sm bg-transparent border dark:border-dark20 border-light20 outline-none'
                      type="text" readOnly={!isEditing} defaultValue={listener.phone} />
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className='flex items-center justify-center gap-[10px] p-[10px] rounded-[5px] bg-redlight300 dark:bg-reddark300 text-dark100 w-[215px]'>
                Hesabdan Çıx
                <FiLogOut />
              </button>
            </div>
          </div>
          {/* step 3 */}
          <div className="flex flex-col gap-6 xs:gap-4">
            <p className='dark:text-dark100 text-gray10 text-base xs:text-sm font-medium'>Dəyərləndirmə</p>
            <Rating />
            <Rating />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile

