import { useSelector } from "react-redux";
import SignUpUser from "../components/Register/SignUpUser";
import SignUpListener from "../components/Register/SignUpListener";

const SignUpPage = () => {
  const role = useSelector((state) => state.role.role);
  return (
    <>
      {role === "user" ? <SignUpUser /> : role === "listener" ? <SignUpListener /> : null}
    </>
  )
};

export default SignUpPage;
