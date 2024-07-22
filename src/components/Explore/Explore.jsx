import React, { useEffect, useState } from 'react';
import ListenerItem from './ListenerItem';
import GroupItem from './GroupItem';
import AnonymousChat from './AnonymousChat';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Explore = () => {
  const [listeners, setListeners] = useState([]);

  const getAllListeners = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/listeners");
      const data = await response.json();
      setListeners(data);
    } catch (error) {
      console.log("Fetch error " + error);
    }
  };

  useEffect(() => {
    getAllListeners();
  }, []);

  return (
    <>
      {/* <p className='text-dark70 text-base pb-[20px]'>Ödənişli Qruplar</p>
      <div className="grid grid-flow-col auto-cols-[173px] xs:auto-cols-[135px] gap-8 xs:gap-4 pb-4 xs:pb-2 overflow-x-auto scrollbar-hide">
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
      </div> 
      <div className='dark:text-dark50 text-light50 underline text-end w-full text-sm xs:text-[10px] px-8 xs:px-0'>
        Hamısına bax
      </div>*/}
      <AnonymousChat />
      <div className="py-6 px-8 xs:px-6">
        <p className='dark:text-dark70 text-light70 text-base xs:text-sm py-[10px]'>Ən Məşhurları</p>
        {listeners?.map((listener, index) => (
          <ListenerItem
            key={listener._id}
            listener={listener}
            number={index + 1}
            name={listener.nickname}
            category={listener.category}
            description={listener.fieldOfActivity}
            userCount={348} // Replace with actual data if available
            rating={4.3} // Replace with actual data if available
            profilePic={listener.profilePic}
          />
        ))}
      </div>
    </>
  );
}

export default Explore;
