// Icons
import OpenEye from "../../icons/OpenEye";
import CloseEye from "../../icons/CloseEye";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { PiCalendar } from "react-icons/pi";

// React Router
import { Link, useNavigate, useParams } from "react-router-dom";

// Hooks
import { useRef, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import Input from "../Input/Input";
import Button from "../Button/Button";

const GeneralInfo = ({ formData, updateFormData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const usernameRef = useRef();
    const nickNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const birthRef = useRef();
    const genderRef = useRef();

    const handleIconClick = () => {
        console.log("Icon clicked"); // Ensure this logs when clicking the icon
        birthRef.current.focus();
        birthRef.current.click();
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        passwordRef.current.type = passwordRef.current.type === 'text' ? 'password' : 'text';
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
        confirmRef.current.type = confirmRef.current.type === 'text' ? "password" : "text"
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateFormData({
          username: usernameRef.current.value,
          nickname: nickNameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          birth: birthRef.current.value,
          password: passwordRef.current.value,
          confirmpassword: confirmRef.current.value,
          gender: genderRef.current.value,
          role: 'listener'
        });
        console.log(formData);
      };

    return (
        <form className="w-[536px] py-12 text-dark100" onSubmit={handleFormSubmit}>
            {/* Username */}
            <button className="w-full h-[54px] mb-8 flex items-center border border-dark100 rounded-[5px] pl-7">
                <FaUser className="mr-4 text-dark100" />
                <input
                    className="bg-transparent placeholder:text-dark100 w-full h-full outline-none"
                    ref={usernameRef}
                    type="text"
                    placeholder="İstifadəçi Adı və Soyadı"
                />
            </button>
            {/* Nickname */}
            <div className="relative h-[54px] mb-8">
                <FaUser className="mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
                <Input
                    ref={nickNameRef}
                    type="text"
                    placeholder="Ləqəb"
                />
            </div>
            {/* Birthdate */}
            <button className="w-full h-[54px] mb-8 flex items-center border border-dark100 rounded-[5px] pl-7">
                <PiCalendar className="mr-4 text-dark100" />
                <input
                    className="bg-transparent placeholder:text-dark100 w-full h-full outline-none"
                    ref={birthRef}
                    type="date"
                    placeholder="Doğum Tarixi"
                />
            </button>
            {/* Email */}
            <div className="relative h-[54px] mb-8">
                <MdOutlineMailOutline className="mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
                <Input
                    ref={emailRef}
                    type="email"
                    placeholder="Elektron Poçt Ünvanı"
                />
            </div>
            {/* Phone */}
            <div className="relative h-[54px] mb-8">
                <img
                    src={require('../../icons/mobile.png')} alt="Icon"
                    className="w-6 h-6 mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
                <Input
                    ref={phoneRef}
                    type="number"
                    placeholder="Əlaqə nömrəsi"
                />
            </div>
            {/* Password */}
            <div className="relative h-[54px] mb-8">
                <IoMdLock className="mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />

                <button type="button" onClick={toggleShowPassword}
                    className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 z-10"
                >
                    {!showPassword ? <CloseEye color="#EBEBEB" /> : <OpenEye color="#EBEBEB" />}
                </button>
                <Input
                    ref={passwordRef}
                    type="password"
                    placeholder="Şifrə"
                />
            </div>

            {/* Confirm Password */}
            <div className="relative h-[54px] mb-7">
                <IoMdLock className="mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
                <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 z-10"
                >
                    {!showConfirmPassword ? <CloseEye color="#EBEBEB" /> : <OpenEye color="#EBEBEB" />}
                </button>
                <Input
                    ref={confirmRef}
                    type="password"
                    placeholder="Şifrənizi Təsdiqləyin"
                />
            </div>
            {/* Gender */}
            <div className="flex items-center mb-16">
                <p className="text-[18px] mr-8">Cinsinizi Seçin:</p>
                <input ref={genderRef} id="male" className="mr-1 tex-lg" type="radio" name="gender" />
                <label className="mr-8" htmlFor="male">Kişi</label>
                <input ref={genderRef} id="female" className="mr-1" type="radio" name="gender" />
                <label className="mr-8" htmlFor="female">Qadın</label>
            </div>

            <Button>
                Növbəti
            </Button>
            <div className="text-center text-base">
                <p className="text-light opacity-60 inline-block mr-1">
                    Artıq bir hesabınız var?
                </p>
                <Link className="text-light underline" to="/sign-in">
                    Daxil Olun
                </Link>
            </div>
        </form>
    )
}

export default GeneralInfo
