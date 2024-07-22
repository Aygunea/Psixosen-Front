// Components
import Menu from "./Menu";
import Music from "./Music";
import Profile from "./Profile";

const Sidebar = () => {
  return (
    <div className=" h-screen pt-[50px] px-8 hidden sm:block">
      <Profile />
      <Menu />
      <Music />
    </div>
  );
};

export default Sidebar;
