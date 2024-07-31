import React, { useEffect } from "react";
import { LuCheckCircle2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { setListener } from "../../slices/listener.slice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const listener = useSelector((state) => state.listener.listener);
  // const role = useSelector((state) => state.role.role);
  const userId = user && user._id;
  const listenerId = listener && listener._id;
//   console.log(listener,user);
// console.log(userId, listenerId);
  const fetchUser = async () => {
    try {
      console.log(userId,listenerId);
      if (userId) {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data=await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        dispatch(setUser(data));
      }
      if (listenerId) {
        const response = await fetch(`http://localhost:3000/api/listeners//specific/${listenerId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(setListener(data));
      }
    } catch (error) {
      console.error(`Fetch Error: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchUser();
    console.log(userId, listenerId);
  }, [userId, listenerId]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:w-[200px] w-[160px] mb-16 flex flex-col items-center justify-center">
        <div className={`w-[144px] h-[144px] mx-7 mb-8 rounded-full overflow-hidden opacity-80 dark:opacity-90
       ${listener ? 'border-[3px] border-lightgreen dark:border-green' : ''}`}>
          <img
            src={user ? user.profilePic : require('../../images/profilePic.jpeg')} alt="Icon"
            className="w-full h-full"
          />
        </div>
        <div className="relative w-full flex justify-center items-center bg-lightgray dark:bg-light200 rounded-[20px] py-2 text-darkblack lg:text-sm text-xs">
          <p>{user ? user.username : listener ? listener.username : 'Loading...'}</p>
          {listener && (<LuCheckCircle2 className="text-sm lg:text-lg text-green absolute lg:right-3 right-2" />)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
