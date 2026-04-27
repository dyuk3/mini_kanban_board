'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, Pencil, Trash2, GripVertical } from 'lucide-react';
import { deleteTask } from '../lib/api';
import { useModal } from '@/context/ModalContext';
import { useDraggable } from '@dnd-kit/react';

type TaskProps = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status?: string;
};

const STATUS: Record<string, { badge: string; border: string }> = {
  pending: {
    badge:  'bg-amber-100  text-amber-700  border-amber-200',
    border: 'border-l-amber-400',
  },
  'in-progress': {
    badge:  'bg-indigo-100 text-indigo-700 border-indigo-200',
    border: 'border-l-indigo-500',
  },
  completed: {
    badge:  'bg-emerald-100 text-emerald-700 border-emerald-200',
    border: 'border-l-emerald-500',
  },
};

const Card = ({ id, title, description, createdAt, status }: TaskProps) => {
  const queryClient = useQueryClient();
  const { ref, handleRef } = useDraggable({ id });
  const { openEditTaskModal } = useModal();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const s = STATUS[status ?? ''] ?? STATUS['pending'];

  return (
    <div
      ref={ref}
      className={[
        'group relative flex flex-col gap-3 rounded-xl p-4',
        'bg-white border border-slate-200 border-l-4',
        s.border,
        'transition-all duration-200 cursor-default',
        'hover:shadow-md hover:shadow-slate-200/80 hover:-translate-y-0.5 hover:border-slate-300',
      ].join(' ')}
    >
      {/* ── Header row: title + drag handle ── */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-block max-w-[75%] truncate rounded-full border px-3 py-1 text-xs font-semibold leading-none ${s.badge}`}
          title={title}
        >
          {title}
        </span>

        <div
          ref={handleRef}
          className="mt-0.5 cursor-grab shrink-0 text-slate-300
                     transition-colors duration-150 hover:text-slate-500"
        >
          <GripVertical size={16} />
        </div>
      </div>

      {/* ── Description ── */}
      {description && (
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      )}

      {/* ── Footer ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock size={12} />
          <span>{createdAt}</span>
        </div>

        {/* Action buttons — visible on hover */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            id={`edit-${id}`}
            onClick={() => openEditTaskModal({ id, title, description })}
            className="flex items-center justify-center w-7 h-7 rounded-lg border border-indigo-200
                       bg-indigo-50 text-indigo-400 cursor-pointer
                       transition-all duration-150
                       hover:bg-indigo-100 hover:text-indigo-600 hover:border-indigo-300"
          >
            <Pencil size={13} />
          </button>

          <button
            id={`delete-${id}`}
            onClick={() => deleteMutation.mutate(id)}
            disabled={deleteMutation.isPending}
            className="flex items-center justify-center w-7 h-7 rounded-lg border border-red-200
                       bg-red-50 text-red-400 cursor-pointer
                       transition-all duration-150
                       hover:bg-red-100 hover:text-red-600 hover:border-red-300
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
