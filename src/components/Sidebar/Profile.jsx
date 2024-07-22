// import { useEffect } from "react";
// import { LuCheckCircle2 } from "react-icons/lu";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../slices/userSlice"; // setUser action'ını import edin

// const Profile = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.user);
//   const userId = user?._id;

//   const fetchUser = async () => {
//     if (userId) {
//       try {
//         const response = await fetch(`http://localhost:3000/api/users/${userId}`);
//         console.log(response+"response");
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data+"data");
//         dispatch(setUser(data)); 
//       } catch (error) {
//         console.log(`Fetch User Error: ${error.message}`);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, [dispatch, userId]); 

//   return (
//     <div className="w-[200px] mb-16">
//       <div className="w-36 h-36 mx-7 mb-8 rounded-full overflow-hidden border-[5px] border-lightgreen dark:border-green opacity-80 dark:opacity-60">
//         <img
//           src={require('../../images/profilePic.jpeg')} alt="Icon"
//           className="w-full h-full"
//         />
//       </div>
//       <div className="flex justify-center items-center bg-lightgray dark:bg-light200 rounded-[20px] px-4 py-2 text-darkblack text-sm gap-3">
//         <p>{user ? user.username : 'Yükleniyor...'}</p>
//         <LuCheckCircle2 className="w-5 h-5 text-green" />
//       </div>
//     </div>
//   );
// };

// export default Profile;
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

  const fetchUser = async () => {
    try {
      if (userId) {
        const responseUser = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (!responseUser.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await responseUser.json();
        dispatch(setUser(userData));
      } else {
        const responseListener = await fetch(`http://localhost:3000/api/listeners/${listenerId}`);
        if (!responseListener.ok) {
          throw new Error('Network response was not ok');
        }
        const listenerData = await responseListener.json();
        dispatch(setListener(listenerData));
      }
    } catch (error) {
      console.error(`Fetch Error: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchUser();
    console.log(userId, listenerId);
  }, [dispatch, userId, listenerId]);

  return (
    <div>
      <div className="w-[200px] mb-16 flex flex-col items-center ">
        <div className={`w-[110px] h-[110px] mx-7 mb-8 rounded-full overflow-hidden opacity-80 dark:opacity-90
       ${listener ? 'border-[3px] border-lightgreen dark:border-green' : ''}`}>
          <img
            src={user ? user.profilePic : require('../../images/profilePic.jpeg')} alt="Icon"
            className="w-full h-full"
          />
        </div>
        <div className="relative w-[200px] flex gap-1 justify-center items-center bg-lightgray dark:bg-light200 rounded-[20px] py-2 text-darkblack text-sm">
          <p>{user ? user.username : listener ? listener.username : 'Loading...'}</p>
          {listener && (<LuCheckCircle2 className="w-5 h-5 text-green absolute right-5" />)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
