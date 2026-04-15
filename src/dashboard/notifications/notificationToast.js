import React from 'react';
import { motion } from 'framer-motion';
import { Bell, BookOpen, Users, Calendar } from 'lucide-react';

const NotificationToast = ({ notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'BATCH_ASSIGNMENT':
        return <BookOpen className="text-primary" />;
      case 'LIVE_CLASS':
        return <Calendar className="text-success" />;
      case 'TASK':
        return <Bell className="text-warning" />;
      case 'USER_JOINED':
        return <Users className="text-info" />;
      default:
        return <Bell />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-white rounded-lg shadow-lg p-4 max-w-md"
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          <h4 className="font-semibold text-gray-800">{notification.data.title}</h4>
          <p className="text-sm text-gray-600">{notification.data.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationToast;