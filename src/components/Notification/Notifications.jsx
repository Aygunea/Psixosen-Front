import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notification from './Notification';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications, deleteNotification } from '../../slices/notifications.slice'

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);
  // const [notifications, setNotifications] = useState([]);
  const userId = useSelector(state => state.user?.user?._id);
  const listenerId = useSelector(state => state.listener?.listener?._id)
  const userModel = useSelector(state => state.role.role);
  // console.log(userId, userModel, listenerId);
  useEffect(() => {
    const fetchNotifications = async () => {
      const id = userId || listenerId;

      try {
        const response = await axios.get('http://localhost:3000/api/notifications', {
          params: {
            userId: id,
            model: userModel
          }
        });
        dispatch(setNotifications(response.data));
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userId, listenerId, userModel, dispatch]);
  useEffect(() => {
    console.log(notifications);

  }, [notifications])
  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  return (
    <div className='py-6 flex flex-col gap-8 xs:gap-6'>
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <Notification
            key={notification._id}
            notification={notification}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className='text-xl dark:text-dark100 text-gray10'>
          Bildiriş yoxdur
        </p>
      )}
    </div>
  );
};

export default Notifications;
