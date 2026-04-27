'use client';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import ModalContext from '@/context/ModalContext';
import EditModal from './EditModal';
import { updateType } from '../types/kanban';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTask, setEditTask] = useState<updateType | null>(null);

  const openAddTaskModal = () => setIsAddOpen(true);
  const closeAddTaskModal = () => setIsAddOpen(false);
  const openEditTaskModal = (task: updateType) => {
    setEditTask(task);
  };
  const closeEditTaskModal = () => {
    setEditTask(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openAddTaskModal,
        closeAddTaskModal,
        openEditTaskModal,
        closeEditTaskModal,
        editTask,
      }}
    >
      <Navbar />
      {children}
      {isAddOpen && <Modal />}
      {editTask && <EditModal />}
    </ModalContext.Provider>
  );
};

export default ClientWrapper;
