'use client';
import Card from './Card';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../lib/api';
import { useDroppable } from '@dnd-kit/react';

interface FormData {
  title: string;
  description: string;
}

const Column = ({ name }: { name: string }) => {
  const { ref, isDropTarget } = useDroppable({
    id: name,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const filteredTasks = data?.filter((task) => task.status === name);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>There was an error loading tasks</p>;

  return (
    <div
      ref={ref}
      className={`${isDropTarget ? ' border-4 border-red-600' : ''} bg-gray-300 p-4 overflow-y-scroll min-w-100 min-h-full`}
    >
      <div className=''>
        <h1 className='text-black text-xl my-4'>{name}</h1>
      </div>
      {/* cards */}
      <div className='flex flex-col gap-2'>
        {filteredTasks?.map((item) => (
          <div key={item.id}>
            <Card
              id={item.id}
              title={item.title}
              description={item.description}
              createdAt={new Date(item.createdAt).toLocaleString('default', {
                month: 'short',
                year: 'numeric',
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
