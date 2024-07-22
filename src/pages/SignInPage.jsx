import { useSelector } from "react-redux";
import SignInUser from "../components/Register/SignInUser";
import SignInListener from "../components/Register/SignInListener";

const SignInPage = () => {
  const role = useSelector((state) => state.role.role);
  return (
    <>
      {role === "user" ? <SignInUser /> : role === "listener" ? <SignInListener /> : null}
    </>
  );
};

export default SignInPage;
