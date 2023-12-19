import { atom } from 'recoil';

export interface Task {
  id: string;
  task: string;
  detail: string;
  deadline: any;
  isComplete: boolean;
  tags: string;
}

export const tasksState = atom<Task[]>({
  key: 'tasksState',
  default: []
});
