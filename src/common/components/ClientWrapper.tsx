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
  const openEditTaskModal = (task: updateType) => setEditTask(task);
  const closeEditTaskModal = () => setEditTask(null);

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

      {/* Main content area fills remaining height with proper padding */}
      <main className="flex flex-1 min-h-0 overflow-hidden px-6 py-5 gap-5">
        {children}
      </main>

      {isAddOpen && <Modal />}
      {editTask && <EditModal />}
    </ModalContext.Provider>
  );
};

export default ClientWrapper;
