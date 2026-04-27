'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTasks } from '../lib/api';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useModal } from '@/context/ModalContext';

interface FormData {
  title: string;
  description: string;
}
const TaskForm = () => {
  const methods = useForm<FormData>({
    mode: 'onChange',
  });
  const queryClient = useQueryClient();

  const { closeAddTaskModal } = useModal();

  const mutation = useMutation({
    mutationFn: createTasks,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormData) => {
    console.log('Form data:', data);
    await mutation.mutateAsync(data);
    methods.reset();
    closeAddTaskModal();
  };
  return (
    <form className='flex flex-col gap-2 ' onSubmit={handleSubmit(onSubmit)}>
      <input
        className='p-2 outline-1 rounded-xl'
        {...register('title')}
        type='text'
        placeholder='title'
      />
      <input
        className='p-2 outline-1 rounded-xl'
        {...register('description')}
        type='text'
        placeholder='description'
      />
      <button className='bg-green-300 p-2 rounded-3xl' type='submit' disabled={mutation.isPending}>
        {mutation.isPending ? 'Adding...' : 'Add Task'}
      </button>
      {mutation.error && <p className='text-red-300'>There was an error Adding Task</p>}
    </form>
  );
};

export default TaskForm;
