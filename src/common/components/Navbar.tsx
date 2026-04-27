'use client';
import { useModal } from '@/context/ModalContext';
import { Plus, Layers } from 'lucide-react';

const Navbar = () => {
  const { openAddTaskModal } = useModal();

  return (
    <nav className="flex shrink-0 items-center justify-between px-8 py-4 z-10
                    bg-white/80 backdrop-blur-xl
                    border-b border-slate-200
                    shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-xl p-2
                        bg-gradient-to-br from-indigo-500 to-violet-600
                        shadow-md shadow-indigo-200">
          <Layers size={18} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gradient select-none">
          KanFlow
        </span>
      </div>

      {/* Add Task */}
      <button
        id="add-task-btn"
        onClick={openAddTaskModal}
        className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold
                   text-white cursor-pointer select-none
                   bg-gradient-to-r from-indigo-500 to-violet-600
                   shadow-md shadow-indigo-200
                   transition-all duration-200
                   hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-300
                   active:translate-y-0 active:shadow-md"
      >
        <Plus size={16} strokeWidth={2.5} />
        Add Task
      </button>
    </nav>
  );
};

export default Navbar;
