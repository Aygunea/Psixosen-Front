// Components
import Menu from "./Menu";
import Music from "./Music";
import Profile from "./Profile";

const Sidebar = () => {
  return (
    <div className=" h-screen pt-[50px] lg:px-8 px-4 hidden lg:block">
      <Profile />
      <Menu />
      <Music />
    </div>
  );
};

export default Sidebar;
