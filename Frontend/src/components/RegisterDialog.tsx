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
import axios from 'axios';
import {
  taskContentState,
  taskDetailState,
  taskDeadlineState,
  taskTagState
} from '../atoms/RegisterDialogContent';
import { getToken } from '../config/authConfig';

// 適切なパスに修正してください

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RegisterDialog({ open, onClose }: Props) {
  const taskContent = useRecoilValue(taskContentState);
  const taskDetail = useRecoilValue(taskDetailState);
  const taskDeadline = useRecoilValue(taskDeadlineState);
  const taskTag = useRecoilValue(taskTagState);
  const [tasks, setTasks] = useRecoilState(tasksState);
 

  const handleRegister = async () => {
    try {

      const accessToken = await getToken();

      const newTask = { 
        task: taskContent,
        detail: taskDetail,
        deadline: taskDeadline,
        isComplete: false,
        tags: taskTag
      };

      const response = await axios.post('content', newTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('タスクが正常に登録されました:', response);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      onClose(); // ダイアログを閉じる

    } catch (error) {
      console.error('タスク登録中にエラーが発生しました:', error);
      alert('タスク登録中にエラーが発生しました。'); // ユーザーへの通知
    }
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