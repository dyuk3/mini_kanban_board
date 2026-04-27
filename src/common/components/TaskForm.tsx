'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTasks } from '../lib/api';
import { useForm } from 'react-hook-form';
import { useModal } from '@/context/ModalContext';

interface FormData {
  title: string;
  description: string;
}

const TaskForm = () => {
  const methods = useForm<FormData>({ mode: 'onChange' });
  const queryClient = useQueryClient();
  const { closeAddTaskModal } = useModal();

  const mutation = useMutation({
    mutationFn: createTasks,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const { handleSubmit, register, formState: { errors } } = methods;

  const onSubmit = async (data: FormData) => {
    await mutation.mutateAsync(data);
    methods.reset();
    closeAddTaskModal();
  };

  const inputClass = `
    w-full rounded-xl border border-slate-200 bg-slate-50
    px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400
    outline-none transition-all duration-150
    focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <input
          {...register('title', { required: true })}
          type="text"
          placeholder="Task title"
          className={inputClass}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">Title is required</p>
        )}
      </div>

      <div>
        <input
          {...register('description')}
          type="text"
          placeholder="Description (optional)"
          className={inputClass}
        />
      </div>

      {mutation.error && (
        <p className="text-xs text-red-500">Failed to add task. Try again.</p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-1 w-full rounded-xl py-2.5 text-sm font-semibold text-white
                   bg-gradient-to-r from-indigo-500 to-violet-600
                   shadow-md shadow-indigo-200
                   transition-all duration-200
                   hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5
                   active:translate-y-0
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {mutation.isPending ? 'Adding…' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
