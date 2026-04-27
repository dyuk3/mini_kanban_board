'use client';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../lib/api';
import { useDroppable } from '@dnd-kit/react';

type ColumnName = 'pending' | 'in-progress' | 'completed';

interface ColConfig {
  label: string;
  accentBar: string;
  dotClass: string;
  borderActive: string;
  bgActive: string;
  countClass: string;
}

const COLUMN_CONFIG: Record<ColumnName, ColConfig> = {
  pending: {
    label: 'Pending',
    accentBar: 'linear-gradient(90deg, #f59e0b, #fb923c)',
    dotClass: 'bg-amber-400',
    borderActive: 'border-amber-400',
    bgActive: 'bg-amber-50/80',
    countClass: 'bg-amber-100 text-amber-700',
  },
  'in-progress': {
    label: 'In Progress',
    accentBar: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    dotClass: 'bg-indigo-500',
    borderActive: 'border-indigo-400',
    bgActive: 'bg-indigo-50/80',
    countClass: 'bg-indigo-100 text-indigo-700',
  },
  completed: {
    label: 'Completed',
    accentBar: 'linear-gradient(90deg, #10b981, #06b6d4)',
    dotClass: 'bg-emerald-500',
    borderActive: 'border-emerald-400',
    bgActive: 'bg-emerald-50/80',
    countClass: 'bg-emerald-100 text-emerald-700',
  },
};

const Column = ({ name }: { name: string }) => {
  const { ref, isDropTarget } = useDroppable({ id: name });

  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const filteredTasks = data?.filter((task) => task.status === name);
  const config = COLUMN_CONFIG[name as ColumnName] ?? {
    label: name,
    accentBar: 'linear-gradient(90deg,#7c3aed,#8b5cf6)',
    dotClass: 'bg-violet-500',
    borderActive: 'border-violet-400',
    bgActive: 'bg-violet-50/80',
    countClass: 'bg-violet-100 text-violet-700',
  };

  return (
    <div
      ref={ref}
      className={[
        'flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-200',
        isDropTarget
          ? `${config.bgActive} border-2 ${config.borderActive} shadow-lg`
          : 'bg-white border border-slate-200 shadow-sm',
      ].join(' ')}
    >
      {/* Colour accent bar */}
      <div className="h-1 shrink-0 rounded-t-2xl" style={{ background: config.accentBar }} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${config.dotClass}`} />
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            {config.label}
          </h2>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${config.countClass}`}>
          {filteredTasks?.length ?? 0}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 mx-4 shrink-0" />

      {/* Cards list */}
      <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
        {isLoading && (
          <p className="mt-6 text-center text-slate-400 text-sm">Loading…</p>
        )}
        {error && (
          <p className="mt-6 text-center text-red-500 text-sm">Error loading tasks</p>
        )}

        {filteredTasks?.map((item, i) => (
          <div
            key={item.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <Card
              id={item.id}
              title={item.title}
              description={item.description}
              status={name}
              createdAt={new Date(item.createdAt).toLocaleString('default', {
                month: 'short',
                year: 'numeric',
              })}
            />
          </div>
        ))}

        {!isLoading && filteredTasks?.length === 0 && (
          <div className="mt-4 rounded-xl border-2 border-dashed border-slate-200 py-10 text-center text-slate-400 text-xs font-medium">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
