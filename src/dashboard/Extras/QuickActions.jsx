import { Book, BookOpen, User, Users, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const { openModal, modalType } = useModal(); // Get modalType
  const [hoveredAction, setHoveredAction] = useState(null);

  const actions = [
    {
      title: 'Create Meeting',
      icon: Video,
      onClick: () => openModal(MODAL_TYPES.CREATE_MEETING),
      variant: 'default'
    },
    {
      title: 'Add Course',
      icon: Book,
      onClick: () => openModal(MODAL_TYPES.ADD_COURSE),
      variant: 'default'
    },
    {
      title: 'Create Batch',
      icon: User,
      onClick: () => openModal(MODAL_TYPES.CREATE_BATCH),
      variant: 'default'
    }
  ];

  // Don't render quick actions if modal is open
  if (modalType) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredAction(action.title)}
            onMouseLeave={() => setHoveredAction(null)}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={action.onClick}
              variant={action.variant}
              size="icon"
              className="rounded-full w-12 h-12 shadow-md"
            >
              <action.icon size={26} />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;