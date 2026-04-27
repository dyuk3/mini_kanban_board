'use client';
import { useModal } from '@/context/ModalContext';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { updateTask } from '../lib/api';
import { updateType } from '../types/kanban';
import { X, Save } from 'lucide-react';

const EditModal = () => {
  const { closeEditTaskModal, editTask } = useModal();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { title: '', description: '' },
  });

  useEffect(() => {
    if (editTask) {
      setValue('title', editTask.title);
      setValue('description', editTask.description);
    }
  });

  const mutation = useMutation({
    mutationFn: ({ id, title, description }: any) =>
      updateTask({ id, title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      closeEditTaskModal();
    },
  });

  const onSubmit = (data: updateType) => {
    if (!editTask) return;
    mutation.mutate({ id: editTask.id, ...data });
  };

  if (!editTask) return null;

  const inputClass = `
    w-full rounded-xl border border-slate-200 bg-slate-50
    px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400
    outline-none transition-all duration-150
    focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100
  `;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center
                 bg-slate-900/30 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeEditTaskModal()}
    >
      <div
        className="animate-fade-in-up relative w-full max-w-md rounded-2xl p-8
                   bg-white border border-slate-200
                   shadow-2xl shadow-slate-300/60"
      >
        {/* Close */}
        <button
          id="close-edit-modal-btn"
          onClick={closeEditTaskModal}
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
            Edit Task
          </h2>
          <p className="mt-1 text-[0.78rem] text-slate-400">
            Update the details and save your changes.
          </p>
        </div>

        <form
          key={editTask.id}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <input
            {...register('title')}
            type="text"
            placeholder="Task title"
            className={inputClass}
          />
          <input
            {...register('description')}
            type="text"
            placeholder="Description"
            className={inputClass}
          />

          {mutation.error && (
            <p className="text-xs text-red-500">Failed to update. Try again.</p>
          )}

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5
                         text-sm font-semibold text-white cursor-pointer
                         bg-gradient-to-r from-indigo-500 to-violet-600
                         shadow-md shadow-indigo-200
                         transition-all duration-200
                         hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5
                         active:translate-y-0
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <Save size={14} />
              {mutation.isPending ? 'Saving…' : 'Save Changes'}
            </button>

            <button
              type="button"
              onClick={closeEditTaskModal}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium
                         text-slate-500 bg-slate-50 cursor-pointer
                         transition-all duration-150
                         hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
