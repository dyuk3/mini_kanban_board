'use client';
import { DragOverEvent } from '@dnd-kit/core';
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

  const handleDragOver = (_event: DragOverEvent) => {};

  const handleDragEnd = (event: DragEndEvent) => {
    const { target, source } = event.operation;
    if (event.canceled) return;
    updateMutation.mutate({
      id: String(source?.id),
      status: String(target?.id),
    });
  };

  return (
    <DragDropProvider
      onDragOver={() => handleDragOver}
      onDragEnd={(event) => handleDragEnd(event)}
    >
      {/* No extra padding here — ClientWrapper already provides it */}
      <div className="flex flex-1 gap-5 min-h-0">
        {(['pending', 'in-progress', 'completed'] as const).map((col) => (
          <div key={col} className="flex flex-col flex-1 min-w-0">
            <Column name={col} />
          </div>
        ))}
      </div>
    </DragDropProvider>
  );
};

export default Board;
