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
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  taskContentState,
  taskDetailState,
  taskDeadlineState,
  taskTagState
} from '../atoms/RegisterDialogContent';
import { getToken } from '../config/authConfig';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RegisterDialog({ open, onClose }: Props) {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [task, setTask] = useRecoilState(taskContentState);
  const [detail, setDetail] = useRecoilState(taskDetailState);
  const [deadline, setDeadline] = useRecoilState(taskDeadlineState);
  const [tags, setTags] = useRecoilState(taskTagState);
  const [newTask, setNewTask] = useState('');

  const addTask = async () => {
    try {
      const accessToken = await getToken();

      const taskData = {
        task: task,
        detail: detail,
        deadline: deadline,
        tags: tags,
      };

      // タスクデータをローカルストレージに保存
      localStorage.setItem('task', JSON.stringify(taskData));

      // タスクデータをサーバーに登録
      const response = await axios.post('content', taskData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('タスクが正常に登録されました:', response);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      onClose(); // ダイアログを閉じる
    } catch (error) {
      console.error('タスク登録中にエラーが発生しました:', error);
      alert('タスク登録中にエラーが発生しました。'); // ユーザーへの通知
    }
  };

  useEffect(() => {
    // ローカルストレージからデータを取得して復元
    const savedTask = localStorage.getItem('task');
    if (savedTask) {
      const parsedTask = JSON.parse(savedTask);
      setTask(parsedTask.task);
      setDetail(parsedTask.detail);
      setDeadline(new Date(parsedTask.deadline));
      setTags(parsedTask.tags);
    }
  }, []);

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
        <Button onClick={addTask} color="primary">
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
}