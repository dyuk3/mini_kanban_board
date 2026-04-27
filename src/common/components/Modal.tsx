'use client';
import TaskForm from './TaskForm';
import { useModal } from '@/context/ModalContext';
import { X } from 'lucide-react';

const Modal = () => {
  const { closeAddTaskModal } = useModal();

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center
                 bg-slate-900/30 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeAddTaskModal()}
    >
      <div
        className="animate-fade-in-up relative w-full max-w-md rounded-2xl p-8
                   bg-white border border-slate-200
                   shadow-2xl shadow-slate-300/60"
      >
        {/* Close */}
        <button
          id="close-add-modal-btn"
          onClick={closeAddTaskModal}
          className="absolute right-4 top-4 flex items-center rounded-lg border border-slate-200
                     p-1.5 text-slate-400 bg-slate-50 cursor-pointer
                     transition-all duration-150
                     hover:bg-red-50 hover:text-red-500 hover:border-red-200"
        >
          <X size={15} />
        </button>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-[1.05rem] font-bold tracking-tight text-slate-800">
            New Task
          </h2>
          <p className="mt-1 text-[0.78rem] text-slate-400">
            Fill in the details below to create a task.
          </p>
        </div>

        <TaskForm />
      </div>
    </div>
  );
};

export default Modal;
