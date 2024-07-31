
import React, { useEffect, useRef } from 'react'
// React Router
import { useNavigate } from "react-router-dom";

// Hooks
import { useState } from "react";

// Redux
import Button from '../Button/Button';
import Accordion from '../Accordion/Accordion';
import { FaGraduationCap } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../slices/form.slice';


const Education = () => {
    const form = useSelector(state => state.form.form)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const educationRef = useRef();
    const experienceRef = useRef();
    const languageRef = useRef();
    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');


    const handleActivitySelect = (activity) => {
        setSelectedActivity(activity);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    const handleNext = (e) => {
        e.preventDefault();
        dispatch(updateFormData({
            education: educationRef.current.value,
            fieldOfActivity: selectedActivity,
            experience: experienceRef.current.value,
            languages: languageRef.current.value,
            category: selectedCategory,
        }));
        navigate('../final');
    };

    useEffect(() => {
        console.log(form);

    }, [form])

    const categories = ["Sevgi münasibəti", "Ailə münasibəti", "Ailə və uşaq münasibəti", "Evlilik",
        "Boşanma", "Psixoloji narahatlıq", "Qorxu", "Koçinq", "Karyera və s."]
    const activities = ["Psixoloq", "Kouç"]

    return (
        <>
            <form className="w-[536px] xs:w-full flex flex-col gap-9 xs:gap-6 pt-12 text-dark100"
                onSubmit={handleNext}>
                {/* Education */}
                <div className="relative h-[60px] xs:h-[50px]">
                    <FaGraduationCap className="mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 xs:text-xs text-base text-dark100" />
                    <input
                        ref={educationRef}
                        type="text"
                        placeholder="Təhsiliniz/İxtisasınız:"
                        className="absolute w-full h-full placeholder:text-dark100 text-base py-3 pl-[52px] focus:outline-none bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px]"
                    />
                </div>
                {/* Fealiyyet sahesi */}
                <Accordion
                    categories={activities}
                    placeholder=" Fəaliyyət sahənizi daxil edin:"
                    onSelect={handleActivitySelect}
                />
                {/* Experience */}
                <div className="relative h-[60px] xs:h-[50px]">
                    <input
                        ref={experienceRef}
                        type="text"
                        placeholder="Fəaliyyətiniz və Təcrübəniz:"
                        className="absolute w-full h-full placeholder:text-dark100 text-base xs:text-xs py-3 pl-4 focus:outline-none bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px] "
                    />
                </div>
                {/* Language */}
                <div className="relative h-[60px] xs:h-[50px]">
                    <input
                        ref={languageRef}
                        type="text"
                        placeholder="Dil biliyiniz:"
                        className="absolute w-full h-full placeholder:text-dark100 text-base xs:text-xs py-3 pl-4 focus:outline-none bg-transparent border border-[#EBEBEB] text-dark100 rounded-[10px] "
                    />
                </div>


                {/* Dinleyici kategoriyasi */}
                <Accordion
                    categories={categories}
                    placeholder="Fəaliyyət göstərmək istədiyiniz dinləyici kateqoriyası"
                    onSelect={handleCategorySelect}
                />

                {/* Button */}
                <div className='my-12 xs:my-8'>
                    <Button>
                    Növbəti
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Education
