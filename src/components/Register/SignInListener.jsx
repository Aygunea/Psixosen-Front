
// Icons
import CloseEye from "../../icons/CloseEye";
import OpenEye from "../../icons/OpenEye";
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
import Input from "../Input/Input";
import Button from "../Button/Button";
import { setListener } from "../../slices/listener.slice";

const SignInListener = () => {
  const role = useSelector((state) => state.role.role);

  const [showPassword, setShowPassword] = useState(false);

  const phoneRef = useRef();
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
      const phone = phoneRef.current.value.trim()
      const password = passwordRef.current.value.trim()
      const response = await axios.post("http://localhost:3000/api/auth/signin", { phone, password, role })
      dispatch(setListener(response.data))
      
      navigate("/home")
      phoneRef.current.value = ""
      passwordRef.current.value = ""
    } catch (error) {
      console.log("Fetch error " + error);
    }
  }

  return (
    <div className="py-[100px] min-h-[100vh] bg-dark bg-fixed flex justify-center items-center">
      <div className="w-[536px] flex items-center justify-center flex-col">
        <div className="w-full text-center">
          <h1 className="text-5xl mb-16 text-bold text-dark100">Daxil Olun</h1>
          {/* Signup with Google */}
          <button className="flex items-center justify-between px-6 h-13 w-full text-sm bg-transparent border border-dark100 text-dark100 rounded-[10px] ">
            <FaGoogle />
            <span className="text-lg">Google ilə daxil olun</span>
            <IoChevronForwardOutline />
          </button>
        </div>

        <div className="w-max my-12 flex justify-center items-center gap-8">
          <span className="inline-block w-[258px] h-[1px] bg-dark50"></span>
          <p className="text-2xl text-dark100 text-center">Və ya</p>
          <span className="inline-block w-[258px] h-[1px] bg-dark50"></span>
        </div>

        <form className="w-full" onSubmit={handleformsubmit}>
          {/* Phone */}
          <div className="relative h-13 mb-9">
            <img
              src={require('../../icons/mobile.png')} alt="Icon"
              className="w-6 h-6 mr-4 absolute top-1/2 -translate-y-1/2 left-4 text-dark100" />
            <Input
              ref={phoneRef}
              type="number"
              placeholder="Mobil nömrə"
            />
          </div>

          {/* Password */}
          <div className="relative h-13 mb-6">
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
              autoComplete="current-password"
            />
          </div>
          <Link className="text-dark70 mb-16 text-base text-end w-full block">
            Parolunuzu unutmusunuz?
          </Link>
          <Button>
            Daxil Ol
          </Button>
          <div className="text-center text-base">
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

export default SignInListener;

