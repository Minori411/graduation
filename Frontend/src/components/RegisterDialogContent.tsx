import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextFieldProps } from '@mui/material';
import { Chip } from '@mui/material';
import { taskContentState, taskDetailState, taskDeadlineState, taskTagState } from '../atoms/RegisterDialogContent';

export default function RegisterDialogContent() {
  const [task, setTask] = useRecoilState(taskContentState);
  const [detail, setDetail] = useRecoilState(taskDetailState);
  const [deadline, setDeadline] = useRecoilState(taskDeadlineState);
  const [tags, setTags] = useRecoilState(taskTagState);

  const [newTask, setNewTask] = useState('');

  // useEffect(() => {
  //   // ローカルストレージからデータを取得して復元
  //   const savedTask = localStorage.getItem('task');
  //   if (savedTask) {
  //     const parsedTask = JSON.parse(savedTask);
  //     setTask(parsedTask.task);
  //     setDetail(parsedTask.detail);
  //     setDeadline(new Date(parsedTask.deadline));
  //     setTags(parsedTask.tags);
  //   }
  // }, []);

  // const addTask = () => {
  //   if (newTask.trim() !== '') {
  //     const taskData = {
  //       task: newTask,
  //       detail: detail,
  //       deadline: deadline,
  //       tags: tags,
  //     };

  //     // 新しいタスクをステートにセット
  //     setTask(newTask);
  //     setDetail(detail);
  //     setDeadline(deadline);
  //     setTags(tags);

  //     // タスクデータをローカルストレージに保存
  //     localStorage.setItem('task', JSON.stringify(taskData));

  //     // 新しいタスクを追加
  //     setNewTask('');
  //   }
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DialogContent>
        登録するタスクの情報を入力してください。
        <Grid container spacing={6} direction="column">
          <Grid item>
            <TextField
              onChange={(e) => setNewTask(e.target.value)}
              margin="dense"
              id="name"
              label="内容"
              value={newTask}
              fullWidth
            />
            <TextField
              onChange={(e) => setDetail(e.target.value)}
              margin="dense"
              id="detail"
              label="詳細"
              value={detail}
              fullWidth
            />

            <DatePicker
              disablePast
              views={['day']}
              inputFormat="yyyy/MM/dd"
              label="期限"
              value={deadline}
              onChange={(date) => setDeadline(date)}
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} />
              )}
            />

            <TextField
              label="タグを追加"
              onChange={(e) => setTags(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
    </LocalizationProvider>
  );
}