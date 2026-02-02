import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LiveClassForm from '../LiveClass/LiveClassForm';
import CourseModal from '../CourseManagement/CoursesModal';
import BatchModal from '../Batchs/BatchModal';

const ModalContext = createContext();

export const MODAL_TYPES = {
  CREATE_MEETING: 'CREATE_MEETING',
  EDIT_MEETING: 'EDIT_MEETING',
  ADD_COURSE: 'ADD_COURSE',
  EDIT_COURSE: 'EDIT_COURSE',
  EDIT_BATCH: 'EDIT_BATCH',
  CREATE_BATCH: 'CREATE_BATCH',
};

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openModal = (type, props = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1060,
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="modal-content bg-white  shadow-xl"
              style={{ width: '90%', maxWidth: '600px' }}
            >
              {modalType === MODAL_TYPES.CREATE_MEETING && (
                <LiveClassForm onSuccess={closeModal} mode="create" {...modalProps} />
              )}
              {modalType === MODAL_TYPES.EDIT_MEETING && (
                <LiveClassForm onSuccess={closeModal} mode="edit" {...modalProps} />
              )}
              {modalType === MODAL_TYPES.ADD_COURSE && (
                <CourseModal onSuccess={closeModal} mode="add" {...modalProps} />
              )}
              {modalType === MODAL_TYPES.EDIT_COURSE && (
                <CourseModal onSuccess={closeModal} mode="edit" {...modalProps} />
              )}
              {modalType === MODAL_TYPES.CREATE_BATCH && (
                <BatchModal handleClose={closeModal} {...modalProps} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};