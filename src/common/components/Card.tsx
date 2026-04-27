'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, Pencil, Trash2, Grip } from 'lucide-react';
import { deleteTask } from '../lib/api';
import { useModal } from '@/context/ModalContext';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/react';

type task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

const Card = ({ id, title, description, createdAt }: task) => {
  const queryClient = useQueryClient();
  const { ref, handleRef } = useDraggable({
    id,
  });

  const { openEditTaskModal } = useModal();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleDelete = async (id: string) => {
    console.log(id);
    deleteMutation.mutate(id);
  };
  const style = {
    transform: CSS,
  };

  return (
    <div
      ref={ref}
      className='bg-white p-4 text-black flex flex-col min-w-100 space-y-8 rounded-2xl'
    >
      <div className='flex justify-between'>
        <span className='text-lg bg-orange-300 text-white font-bold p-1 px-4 rounded-2xl'>
          {title}
        </span>
        <Grip className='cursor-pointer' ref={handleRef} />
      </div>
      <p className='font-medium'>{description}</p>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Clock />
          <p>{createdAt}</p>
        </div>
        <div className='flex gap-2'>
          <div className='cursor-pointer'>
            <Pencil
              onClick={() => openEditTaskModal({ id: id, title: title, description: description })}
              size={20}
            />
          </div>
          <div className='cursor-pointer'>
            <Trash2 onClick={() => handleDelete(id)} size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
