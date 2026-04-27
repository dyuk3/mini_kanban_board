import { useModal } from '@/context/ModalContext';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { updateTask } from '../lib/api';
import { updateType } from '../types/kanban';

const EditModal = () => {
  const { closeEditTaskModal, editTask } = useModal();
  const queryClient = useQueryClient();
  console.log('edit task', editTask);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  // useEffect(() => {
  //   if (editTask) {
  //     reset({
  //       title: editTask.title,
  //       description: editTask.description,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    console.log('Reset with', editTask);
    if (editTask) {
      setValue('title', editTask.title);
      setValue('description', editTask.description);
    }
  });

  const mutation = useMutation({
    mutationFn: ({ id, title, description }: any) => updateTask({ id, title, description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      closeEditTaskModal();
    },
  });

  const onSubmit = (data: updateType) => {
    console.log('data: ', data);
    if (!editTask) return;
    mutation.mutate({
      id: editTask.id,
      ...data,
    });
  };

  if (!editTask) return null;

  return (
    <div
      className={`flex justify-center items-center absolute text-black w-screen h-screen bg-black/50 `}
    >
      <div className='bg-white py-12  p-20 px-40 flex justify-center items-center rounded-2xl relative'>
        <form
          key={editTask.id}
          className='flex flex-col w-100 gap-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type='text'
            {...register('title')}
            className='p-2 outline-0 border border-gray-400 rounded'
            placeholder='Edit title'
          />
          <input
            type='text'
            {...register('description')}
            className='p-2 outline-0 border border-gray-400 rounded'
            placeholder='Edit description'
          />
          <div className='self-center flex gap-6 mt-4'>
            <button className='bg-green-400 px-4 py-2 rounded cursor-pointer' type='submit'>
              Update
            </button>
            <button
              type='button'
              className='bg-red-400 p-2 rounded cursor-pointer'
              onClick={closeEditTaskModal}
            >
              Cancel
            </button>
          </div>
        </form>

        <p className='text-xl absolute right-4 top-4 cursor-pointer' onClick={closeEditTaskModal}>
          X
        </p>
      </div>
    </div>
  );
};

export default EditModal;
