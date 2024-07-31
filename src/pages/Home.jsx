import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";
import useSocket from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../slices/userSlice";
import { setOnlineListeners } from "../slices/listener.slice";
import { useEffect } from "react";
import Menu from "../Mobile/Menu/Menu";

const Home = () => {
  const dispatch = useDispatch();
  const role = useSelector(state => state.role.role);
  const user = useSelector(state => state.user.user);
  const listener = useSelector(state => state.listener.listener);

  const socket = useSocket({ userId: user?._id || listener?._id, userType: role });

  useEffect(() => {
    if (socket) {
        socket.on("getOnlineUsers", (userIds) => {
            dispatch(setOnlineUsers(userIds));
        });

        socket.on("getOnlineListeners", (userIds) => {
            dispatch(setOnlineListeners(userIds));
        });

        return () => socket.disconnect();
    }
}, [socket, dispatch]);

  return (
    <div className="dark:bg-dark bg-light flex">
      <Sidebar />
      <Main />
      <Menu />
    </div>
  );
};

export default Home;
