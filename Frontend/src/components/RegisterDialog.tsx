import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import RegisterDialogContent from './RegisterDialogContent';
import { useRecoilValue, useRecoilState } from 'recoil';
import { tasksState } from '../atoms/Tasks';
import {
  taskContentState,
  taskDetailState,
  taskDeadlineState,
  tagstate
} from '../atoms/RegisterDialogContent';
import { atom } from 'recoil';
import { Task } from '../atoms/Tasks';

export const taskCategoryState = atom<string>({
  key: 'taskCategoryState',
  default: '',
});

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RegisterDialog({ open, onClose }: Props) {
  const taskContent = useRecoilValue(taskContentState);
  const taskDetail = useRecoilValue(taskDetailState);
  const taskDeadline = useRecoilValue(taskDeadlineState);
  const [tasks, setTasks] = useRecoilState(tasksState);

  const handleRegister = () => {
    const newTask = {
      id: tasks.length + 1,
      content: taskContent,
      detail: taskDetail,
      deadline: taskDeadline,
      isComplete: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask] as Task[]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle>タスク登録</DialogTitle>
      <RegisterDialogContent />
      <DialogContent>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleRegister} color="primary">
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
}