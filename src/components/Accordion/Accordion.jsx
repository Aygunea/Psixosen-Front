import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Accordion = ({ categories, placeholder, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (category) => {
        setSelectedValue(category);
        setIsOpen(false);
        onSelect(category);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    onClick={handleToggle}
                    value={selectedValue}
                    readOnly
                    className="w-full h-[60px] xs:h-[50px] text-base xs:text-xs py-3 pl-4 leading-9 outline-none placeholder:text-dark100 bg-transparent border border-dark100 text-dark100 rounded-[10px]"
                />
                <FaChevronDown className={`xs:text-xs absolute top-1/2 -translate-y-1/2 right-4 text-dark100 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <ul className="py-1 mt-5 xs:mt-2 bg-dark border border-dark100 rounded-[10px] xs:text-xs">
                    {categories.map((category, index) => (
                        <li key={index}
                            onClick={() => handleSelect(category)}
                            className={`px-6 h-[60px] xs:h-[40px] leading-[60px] xs:leading-[40px] cursor-pointer border-dark100 ${index !== categories.length - 1 ? 'border-b' : ''}`}>
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Accordion;
