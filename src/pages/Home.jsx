// Components
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";
// Custom hooks
import useSocket from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../slices/userSlice";
import { setOnlineListeners } from "../slices/listener.slice";
import { useEffect } from "react";
import Menu from "../Mobile/Menu/Menu";

const Home = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const role = useSelector(state => state.role.role);

  useEffect(() => {
    if (socket && role === 'user') {
      socket.on("getOnlineUsers", (userIds) => {
        dispatch(setOnlineUsers(userIds));
      });
    }

    if (socket && role === 'listener') {
      socket.on("getOnlineListeners", (userIds) => {
        dispatch(setOnlineListeners(userIds));
      });
    }

    return () => {
      if (socket) {
        socket.off("getOnlineUsers");
        socket.off("getOnlineListeners");
        socket.disconnect();
      }
    };
  }, [socket, role, dispatch]);

  return (
    <div className="dark:bg-dark bg-light flex">
      <Sidebar />
      <Main />
      <Menu />
    </div>
  );
};

export default Home;
