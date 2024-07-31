import OpenEye from "../../icons/OpenEye";
import CloseEye from "../../icons/CloseEye";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { PiPhone } from "react-icons/pi";
// React Router
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useEffect, useRef, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { updateFormData } from "../../slices/form.slice";

const GeneralInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useSelector(state => state.form.form)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const usernameRef = useRef();
    const nickNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const [gender, setGender] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        passwordRef.current.type = passwordRef.current.type === 'text' ? 'password' : 'text';
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
        confirmRef.current.type = confirmRef.current.type === 'text' ? "password" : "text"
    };


    const handleNext = (e) => {
        e.preventDefault();
        dispatch(updateFormData({
            username: usernameRef.current.value,
            nickname: nickNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            password: passwordRef.current.value,
            confirmpassword: confirmRef.current.value,
            gender,
            role: 'listener'
        }));
        console.log(form);
        navigate('../education');
    };
    useEffect(() => {
        console.log(form);
    }, [form])
    return (
        <form className="w-[536px] xs:w-full flex flex-col gap-9 xs:gap-6 pt-12 text-dark100"
            onSubmit={handleNext}>
            {/* Username */}
            <div className="relative h-[60px] xs:h-[50px]">
                <FaUser className="mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 xs:text-sm text-base text-dark100" />
                <Input
                    ref={usernameRef}
                    type="text"
                    placeholder="İstifadəçi Adı və Soyadı"
                />
            </div>
            {/* Nickname */}
            <div className="relative h-[60px] xs:h-[50px]">
                <FaUser className="mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 xs:text-xs text-base text-dark100" />
                <Input
                    ref={nickNameRef}
                    type="text"
                    placeholder="Ləqəb"
                />
            </div>
            {/* Email */}
            <div className="relative h-[60px] xs:h-[50px]">
                <MdOutlineMailOutline className="mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 xs:text-xs text-base text-dark100" />
                <Input
                    ref={emailRef}
                    type="email"
                    placeholder="Elektron Poçt Ünvanı"
                />
            </div>
            {/* Phone */}
            <div className="relative h-[60px] xs:h-[50px]">
                <PiPhone className="mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 xs:text-xs text-base text-dark100" />
                <Input
                    ref={phoneRef}
                    type="number"
                    placeholder="Əlaqə nömrəsi"
                />
            </div>
            {/* Password */}
            <div className="relative h-[60px] xs:h-[50px]">
                <IoMdLock className="mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 xs:text-xs text-base text-dark100" />

                <button type="button" onClick={toggleShowPassword}
                    className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 z-10"
                >
                    {!showPassword ? <CloseEye color="#EBEBEB" /> : <OpenEye color="#EBEBEB" />}
                </button>
                <Input
                    ref={passwordRef}
                    placeholder="Şifrə"
                />
            </div>

            {/* Confirm Password */}
            <div className="relative h-[60px] xs:h-[50px]">
                <IoMdLock className="mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 xs:text-xs text-base text-dark100" />
                <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 z-10"
                >
                    {!showConfirmPassword ? <CloseEye color="#EBEBEB" /> : <OpenEye color="#EBEBEB" />}
                </button>
                <Input
                    ref={confirmRef}
                    placeholder="Şifrənizi Təsdiqləyin"
                />
            </div>
              {/* Gender */}
              <div className="flex mb-16 xxs:flex-col xxs:gap-2">
              <p className="text-lg xs:text-sm mr-8 xs:mr-1">Cinsinizi Seçin:</p>
              <div className="flex items-center gap-1">
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="mr-8 xs:mr-1 text-lg xs:text-xs" htmlFor="male">Kişi</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  id="female"
                  className="mr-1"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="mr-8 xs:mr-1 text-lg xs:text-xs" htmlFor="female">Qadın</label>
              </div>
            </div>
            {/* <div className="flex items-center mb-16">
                <p className="text-[18px] mr-8">Cinsinizi Seçin:</p>
                <input ref={genderRef} id="male" className="mr-1 tex-lg" type="radio" name="gender" />
                <label className="mr-8" htmlFor="male">Kişi</label>
                <input ref={genderRef} id="female" className="mr-1" type="radio" name="gender" />
                <label className="mr-8" htmlFor="female">Qadın</label>
            </div> */}

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