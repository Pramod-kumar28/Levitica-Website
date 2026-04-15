import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';
import NotificationToast from './notificationToast';


const NotificationContext = createContext();

export const NotificationTypes = {
  BATCH_ASSIGNMENT: 'BATCH_ASSIGNMENT',
  LIVE_CLASS: 'LIVE_CLASS',
  TASK: 'TASK',
  USER_JOINED: 'USER_JOINED'
};

export const NotificationProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Handle different notification types
    Object.values(NotificationTypes).forEach(type => {
      socket.on(type, (data) => {
        const newNotification = {
          id: Date.now(),
          type,
          data,
          timestamp: new Date()
        };

        setNotifications(prev => [newNotification, ...prev]);
        toast.custom((t) => (
          <NotificationToast notification={newNotification} />
        ));
      });
    });

    return () => {
      Object.values(NotificationTypes).forEach(type => {
        socket.off(type);
      });
    };
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ notifications, isConnected }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);