// Icons
import Profile from "../../icons/Profile";
import CloseEye from "../../icons/CloseEye";
import OpenEye from "../../icons/OpenEye";
import { FaUser } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import { FaGoogle } from "react-icons/fa6";
import { IoChevronForwardOutline } from "react-icons/io5";
import axios from 'axios'
// React Router
import { Link, useNavigate } from "react-router-dom";

// Hooks
import { useRef, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/userSlice";
import Input from "../Input/Input";
import Button from "../Button/Button";

const SignInUser = () => {
  const role = useSelector((state) => state.role.role);

  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
    passwordRef.current.type = passwordRef.current.type === 'text' ? "password" : "text"
  };
  const handleformsubmit = async (e) => {
    e.preventDefault()
    try {
      const username = usernameRef.current.value.trim()
      const password = passwordRef.current.value.trim()
      const response = await axios.post("http://localhost:3000/api/auth/signin", { username, password, role })
      dispatch(setUser(response.data))
      
      navigate("/home")
      usernameRef.current.value = ""
      passwordRef.current.value = ""
    } catch (error) {
      console.log("Fetch error " + error);
    }
  }

  return (
    <div className="py-[100px] min-h-[100vh] bg-dark bg-fixed flex justify-center items-center">
      <div className="w-[536px] xs:w-[330px] flex items-center justify-center flex-col">
        <div className="w-full text-center">
          <h1 className="text-5xl xs:text-3xl mb-16 text-bold text-dark100">Daxil Olun</h1>
          {/* Signup with Google */}
          <button className="relative w-full h-13 text-sm bg-transparent border border-dark100 text-dark100 rounded-[10px] ">
            <FaGoogle className="xs:text-xs absolute top-1/2 -translate-y-1/2 left-4" />
            <span className="text-base xs:text-sm">Google ilə daxil olun</span>
            <IoChevronForwardOutline className="xs:text-xs absolute top-1/2 -translate-y-1/2 right-4" />
          </button>
        </div>

        <div className="w-max my-20 xs:my-14 flex justify-center items-center gap-8">
          <span className="inline-block w-[258px] xs:w-[129px] h-[1px] bg-dark50"></span>
          <p className="text-2xl xs:text-base text-dark100 text-center">Və ya</p>
          <span className="inline-block w-[258px] xs:w-[129px] h-[1px] bg-dark50"></span>
        </div>

        <form className="w-full" onSubmit={handleformsubmit}>
          {/* Username */}
          <div className="relative h-13 mb-10 xs:mb-8">
            <FaUser className="xs:text-xs mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 text-dark100" />
            <Input
              ref={usernameRef}
              type="text"
              placeholder="İstifadəçi Adı"
            />
          </div>

          {/* Password */}
          <div className="relative h-13 mb-6 xs:mb-4">
            <IoMdLock className="xs:text-xs mr-4 absolute top-1/2 -translate-y-1/2 left-6 xs:left-4 text-dark100" />

            <button type="button" onClick={toggleShowPassword}
              className="w-4 h-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 z-10"
            >
              {!showPassword ? <CloseEye color="#EBEBEB" /> : <OpenEye color="#EBEBEB" />}
            </button>
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Şifrə"
              autoComplete="current-password"
            />
          </div>

          <Link className="text-dark70 mb-16 text-base xs:text-xs text-end w-full block">
            Parolunuzu unutmusunuz?
          </Link>
          <button className="w-full h-13 bg-light200 text-darkblack text-2xl xs:text-base font-semibold p-2 mb-6 rounded-[10px] hover:scale-95 transition-all duration-200">
            Daxil Ol
          </button>
          <div className="text-center text-base xs:text-xs">
            <p className="text-dark70 inline-block mr-1">
              Hələ də qeydiyyatdan keçməmisiniz?
            </p>
            <Link className="text-dark100 underline" to="/sign-up">
              Hesab Yaradın
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInUser;
