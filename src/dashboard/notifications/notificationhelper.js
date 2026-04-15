import { NotificationTypes } from '@/dashboard/context/NotificationContext';

export const sendNotification = async (socket, type, data) => {
  if (!Object.values(NotificationTypes).includes(type)) {
    throw new Error(`Invalid notification type: ${type}`);
  }

  return new Promise((resolve, reject) => {
    socket.emit(type, data, (response) => {
      if (response?.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
};

export const joinRoom = (socket, roomId) => {
  socket.emit('join_room', roomId);
};

export const leaveRoom = (socket, roomId) => {
  socket.emit('leave_room', roomId);
};