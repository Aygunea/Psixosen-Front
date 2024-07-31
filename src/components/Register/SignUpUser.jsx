// Icons
import OpenEye from "../../icons/OpenEye";
import CloseEye from "../../icons/CloseEye";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useRef, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../slices/role.slice";

//Component
import Input from "../Input/Input";
import Popup from "../Popup/Popup";
import Button from "../Button/Button";

const SignUpUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [gender, setGender] = useState('');

  const role = useSelector((state) => state.role.role);
  //popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const closePopup = () => {
    setPopupVisible(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    passwordRef.current.type = passwordRef.current.type === 'text' ? 'password' : 'text';
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
    confirmRef.current.type = confirmRef.current.type === 'text' ? "password" : "text"
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = usernameRef.current.value.trim();
      const password = passwordRef.current.value.trim();
      const email = emailRef.current.value.trim();
      const confirmpassword = confirmRef.current.value.trim();
      dispatch(setRole('user'));
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ username, password, email, confirmpassword, gender, role })
      });
      const data = await response.json();
      if (!response.ok) {
        setPopupType('failed');
        setPopupMessage(data.message);
        setPopupVisible(true);
        return;
      } else {
        setPopupType('success');
        setPopupMessage(data.message);
        setPopupVisible(true);
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
    } catch (error) {
      setPopupType('failed');
      setPopupVisible(true);
      setPopupMessage('Server xətası. Zəhmət olmasa yenidən cəhd edin.');
    }
  };

  return (
    <div className="min-h-[100vh] py-[100px] bg-dark bg-fixed">
      <div className="flex justify-center items-center">
        <div className="w-[536px] xs:mx-6 xs:w-full flex flex-col items-center justify-center">
          <div className="w-full text-center">
            <h1 className="text-5xl xs:text-3xl sm:text-4xl mb-12 xs:mb-10 text-bold text-dark100">Qeydiyyat Formu</h1>
          </div>
          <form className="w-full text-dark100 flex flex-col gap-9 xs:gap-6" onSubmit={handleFormSubmit}>
            {/* Username */}
            <div className="relative h-[60px] xs:h-[50px]">
              <FaUser className=" mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
              <Input
                ref={usernameRef}
                type="text"
                placeholder="İstifadəçi Adı"
              />
            </div>

            {/* Email */}
            <div className="relative h-[60px] xs:h-[50px]">
              <MdOutlineMailOutline className="mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
              <Input
                ref={emailRef}
                type="email"
                placeholder="Elektron Poçt Ünvanı"
              />
            </div>

            {/* Password */}
            <div className="relative h-[60px] xs:h-[50px]">
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
            <div className="relative h-[60px] xs:h-[50px]">
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
            <div className="flex justify-between mb-16 xxs:flex-col xxs:gap-2">
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
              <div className="flex items-center gap-1">
                <input
                  id="none"
                  className="mr-1"
                  type="radio"
                  name="gender"
                  value="none"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="text-lg xs:text-xs" htmlFor="none">Bildirmək istəmirəm</label>
              </div>
            </div>
            <div className="flex flex-col">
              <Button>
                Hesab Yaradın
              </Button>
              <div className="text-center text-base xs:text-xs">
                <p className="text-dark100 opacity-60 inline-block mr-1">
                  Artıq bir hesabınız var?
                </p>
                <Link className="text-dark100 underline" to="/sign-in">
                  Daxil Olun
                </Link>
              </div>
            </div>
          </form>
        </div>
        {
          popupVisible && <Popup
            message={popupMessage}
            type={popupType}
            onClose={closePopup} />
        }
      </div>
    </div>
  );
};

export default SignUpUser;
