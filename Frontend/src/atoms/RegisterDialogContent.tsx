import { atom } from 'recoil';

export const taskContentState = atom<string>({
  key: 'taskContentState',
  default: ''
});

export const taskDetailState = atom<string>({
  key: 'taskDetailState',
  default: ''
});

export const taskDeadlineState = atom<Date | null>({
  key: 'taskDeadlineState',
  default: new Date()
});

export const taskTagState = atom<string>({
  key: 'tagState',
  default: ""
});
