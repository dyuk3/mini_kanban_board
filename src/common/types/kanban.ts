export type Status = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
}

type updatePayload = {
  id: string;
  title: string;
  description: string;
};

export interface Column {
  id: Status;
  title: string;
}

export interface updateType {
  id?: string;
  title: string;
  description: string;
}
