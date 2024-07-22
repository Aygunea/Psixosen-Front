
import React from 'react'
// React Router
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useRef, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import Input from '../Input/Input';
import Button from '../Button/Button';
import Accordion from '../Accordion/Accordion';
const Education = ({ formData, updateFormData }) => {
    const navigate = useNavigate();
    const educationRef = useRef();
    const experienceRef = useRef();
    const languageRef = useRef();
    const additionalSkillsRef = useRef();
    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [diplomaFile, setDiplomaFile] = useState(null);

    const handleActivitySelect = (activity) => {
        setSelectedActivity(activity);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleFileChange = (e) => {
        setDiplomaFile(e.target.files[0]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateFormData({
            education: educationRef.current.value,
            fieldOfActivity: selectedActivity,
            experience: experienceRef.current.value,
            languages: languageRef.current.value,
            additions: "additions",
            category: selectedCategory,
            diploma: "diploma",
        });
        console.log(formData);

    };


    const categories = ["Sevgi münasibəti", "Ailə münasibəti", "Ailə və uşaq münasibəti", "Evlilik",
        "Boşanma", "Psixoloji narahatlıq", "Qorxu", "Koçinq", "Karyera və s."]
    const activities = ["Psixoloq", "Kouç"]
    return (
        <form className="w-[536px] pt-12 text-dark100" onSubmit={handleFormSubmit}>
            {/* Education */}
            <div className="relative h-[60px] mb-9">
                <img
                    src={require('../../icons/education.png')} alt="Icon"
                    className="w-6 h-5 mr-4 absolute top-1/2 -translate-y-1/2 left-4" />
                <input
                    ref={educationRef}
                    type="text"
                    placeholder="Təhsiliniz/İxtisasınız:"
                    className="absolute w-full h-full placeholder:text-dark100 text-base py-3 pl-[52px] leading-9 focus:outline-none bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px]"
                />
            </div>
            {/* Diploma */}
            <div className="relative">
                <img
                    src={require('../../icons/download.png')} alt="Icon"
                    className="w-4 h-4 mr-4 absolute top-1/2 -translate-y-1/2 right-4" />
                <input
                    type="file"
                    name="diploma"
                    onChange={handleFileChange}
                    className="absolute w-full h-full placeholder:text-dark100  opacity-0 leading-9 focus:outline-none bg-transparent"
                />
                <div className="pl-4 flex items-center justify-between w-full bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px] h-[60px] mb-9">
                    Təhsilini təstiqləyən diplom və sənədi yüklə:
                </div>
            </div>
            {/* Fealiyyet sahesi */}
            <Accordion
                categories={activities}
                placeholder=" Fəaliyyət sahənizi daxil edin:"
                onSelect={handleActivitySelect}
            />
            {/* Experience */}
            <div className="relative h-[60px] mb-9">
                <input
                    ref={experienceRef}
                    type="text"
                    placeholder="Fəaliyyətiniz və Təcrübəniz:"
                    className="absolute w-full h-full placeholder:text-dark100 text-base py-3 pl-4 leading-9 focus:outline-none bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px] "
                />
            </div>
            {/* Language */}
            <div className="relative h-[60px] mb-9">
                <input
                    ref={languageRef}
                    type="text"
                    placeholder="Dil biliyiniz:"
                    className="absolute w-full h-full placeholder:text-dark100 text-base py-3 pl-4 leading-9 focus:outline-none bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px] "
                />
            </div>
            {/* Elave Bilik ve bacariqlar */}
            <div className="relative">
                <span className='text-xs absolute top-1/2 -translate-y-1/2 right-4'>
                    (mövcud serifaktlarınız daxil edin)
                </span>
                <input
                    ref={additionalSkillsRef}
                    type="text"
                    className="absolute w-full h-full placeholder:text-dark100  opacity-0 leading-9 focus:outline-none bg-transparent"
                />
                <div className="pl-4 flex items-center justify-between w-full bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px] h-[60px] mb-9">
                    Əlavə bilik və bacarıqlarınız:
                </div>
            </div>

            {/* Dinleyici kategoriyasi */}
            <Accordion
                categories={categories}
                placeholder="Fəaliyyət göstərmək istədiyiniz dinləyici kateqoriyası"
                onSelect={handleCategorySelect}
            />

            {/* Checkbox */}
            <div className="h-[60px] my-9 mx-6 flex items-center">
                <div className='w-7 h-7 mr-6 rounded-[5px] bg-[#EAE7E5] flex justify-center items-center'>
                    <img
                        src={require('../../icons/done.png')} alt="Icon"
                        className="w-3 h-2" />
                </div>
                <p className='text-xl text-dark100'>Şərtlər və Qaydaları oxuyub təstiq edin</p>
            </div>

            {/* Button */}
            <div className='my-12'>
                <Button>
                    Növbəti
                </Button>
                <div className="text-center text-lg">
                    <p className="text-dark100 opacity-70 inline-block mr-1">
                        Artıq bir hesabınız var?
                    </p>
                    <Link className="text-dark100 underline" to="/sign-in">
                        Daxil Olun
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default Education
