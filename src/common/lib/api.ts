import { Task, updateType } from '../types/kanban';

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch('/api/tasks');

  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
};

export const createTasks = async (data: { title: string; description: string }) => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create new User');

  return res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete task');

  return res.json();
};

export const updateTask = async ({ id, title, description }: updateType) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) throw new Error('Failed updating task');

  return res.json();
};

export const updateTaskStatus = async ({ id, status }: { id: string; status: string }) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error('There was an issue updating the status of the Task');

  return res.json();
};
