import { updateType } from '@/common/types/kanban';
import { createContext, useContext } from 'react';

type ModalContextType = {
  openAddTaskModal: () => void;
  closeAddTaskModal: () => void;
  openEditTaskModal: (task: updateType) => void;
  closeEditTaskModal: () => void;
  editTask: updateType | null;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('userModal should be inside ModalProvider');
  }
  return context;
};

export default ModalContext;
