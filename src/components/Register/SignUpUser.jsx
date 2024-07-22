// Icons
import OpenEye from "../../icons/OpenEye";
import CloseEye from "../../icons/CloseEye";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { FaGoogle } from "react-icons/fa6";
import { IoChevronForwardOutline } from "react-icons/io5";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useRef, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { setRole } from "../../slices/role.slice";


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

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup error:', errorData.message);
        return;
      }

      const data = await response.json();
      console.log(data);
      navigate("/sign-in");
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="py-[64px] bg-dark bg-fixed flex justify-center items-center">
      <div className="w-[536px] flex items-center justify-center flex-col">
        <div className="w-full text-center">
          <h1 className="text-5xl mb-12 text-bold text-dark100">Qeydiyyat Formu</h1>
          {/* SignupUser with Google */}
          <button className="flex items-center justify-between px-6 h-13 w-full text-sm bg-transparent border border-dark100 text-dark100 rounded-[10px] ">
            <FaGoogle />
            <span className="text-lg">Google ilə daxil olun</span>
            <IoChevronForwardOutline />
          </button>
        </div>

        <div className="w-max my-12 flex justify-center items-center gap-8">
          <span className="inline-block w-[258px] h-[1px] bg-dark50"></span>
          <p className="text-2xl text-dark100 text-center">Və ya qeydiyyatdan keçin</p>
          <span className="inline-block w-[258px] h-[1px] bg-dark50"></span>
        </div>

        <form className="w-full text-dark100" onSubmit={handleFormSubmit}>
          {/* Username */}
          <div className="relative h-[54px] mb-9">
            <FaUser className=" mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
            <Input
              ref={usernameRef}
              type="text"
              placeholder="İstifadəçi Adı"
            />
          </div>

          {/* Email */}
          <div className="relative h-[54px] mb-9">
            <MdOutlineMailOutline className="mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
            <Input
              ref={emailRef}
              type="email"
              placeholder="Elektron Poçt Ünvanı"
            />
          </div>

          {/* Password */}
          <div className="relative h-[54px] mb-9">
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
          <div className="flex justify-between mb-16">
            <p className="text-[18px] mr-8">Cinsinizi Seçin:</p>
            {/* <input id="male" className="mr-1 tex-lg" type="radio" name="gender" /> */}
            <input
              id="male"
              className="mr-1 tex-lg"
              type="radio"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="mr-8" htmlFor="male">Kişi</label>
            <input
              id="female"
              className="mr-1"
              type="radio"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="mr-8" htmlFor="female">Qadın</label>
            <input 
              id="none" 
              className="mr-1" 
              type="radio" 
              name="gender" 
              value="none" 
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="none">Bildirmək istəmirəm</label>
          </div>
          <button className="w-full h-13 bg-light200 text-darkblack text-2xl font-semibold p-2 mb-6 rounded-[10px] hover:scale-95 transition-all duration-200">
            Hesab Yaradın
          </button>
          <div className="text-center text-base">
            <p className="text-dark100 opacity-60 inline-block mr-1">
              Artıq bir hesabınız var?
            </p>
            <Link className="text-dark100 underline" to="/sign-in">
              Daxil Olun
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpUser;
