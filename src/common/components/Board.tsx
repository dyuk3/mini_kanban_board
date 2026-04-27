'use client';
import { closestCenter, DndContext, DragOverEvent } from '@dnd-kit/core';
import Column from './Column';
import { fetchTasks, updateTaskStatus } from '../lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';

const Board = () => {
  const queryclient = useQueryClient();

  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const updateMutation = useMutation({
    mutationFn: updateTaskStatus,
    onSuccess: () => queryclient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const findTask = (id: string) => tasks.find((t) => t.id === id);

  const handleDragOver = (event: DragOverEvent) => {};
  const handleDragEnd = (event: DragEndEvent) => {
    const { target, source } = event.operation;
    if (event.canceled) return;
    console.log(`Dropped ${source?.id} onto ${target?.id}`);
    const taskId = source?.id;
    const newStatus = target?.id;

    updateMutation.mutate({
      id: String(taskId),
      status: String(newStatus),
    });
  };

  return (
    <DragDropProvider onDragOver={() => handleDragOver} onDragEnd={(event) => handleDragEnd(event)}>
      <div className='w-full flex gap-12 px-20 relative'>
        <div className='flex-1'>
          <Column name='pending' />
        </div>
        <div className='flex-1'>
          <Column name='in-progress' />
        </div>
        <div className='flex-1'>
          <Column name='completed' />
        </div>
      </div>
    </DragDropProvider>
  );
};

export default Board;
