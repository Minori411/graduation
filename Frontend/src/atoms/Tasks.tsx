import { atom } from 'recoil';

export interface Task {
  id: number;
  content: string;
  detail: string;
  deadline: any;
  isComplete: boolean;
  tags: any;
}

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: []
});
