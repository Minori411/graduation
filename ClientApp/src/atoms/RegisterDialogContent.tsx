import { atom } from 'recoil';

export const taskContentState = atom<string>({
  key: 'taskContentState',
  default: ''
});

export const taskDetailState = atom<string>({
  key: 'taskDetailState',
  default: ''
});

export const taskDeadlineState = atom<Date>({
  key: 'taskDeadlineState',
  default: new Date()
});

