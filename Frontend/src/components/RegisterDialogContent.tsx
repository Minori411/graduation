import React,{ useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextFieldProps } from '@mui/material';
import { useState } from 'react';
import { Chip } from '@mui/material';
import { tasksState, Task } from '../atoms/Tasks';



import {
  taskContentState,
  taskDetailState,
  taskDeadlineState,
  taskTagState
} from '../atoms/RegisterDialogContent';


export default function RegisterDialogContent() {
  const [Task,setTask] = useRecoilState(taskContentState);
  const [Detail,setDetail] = useRecoilState(taskDetailState);
  const [deadline, setDeadline] = useRecoilState(taskDeadlineState);
  const [tags, setTags] = useRecoilState(taskTagState);
  const [tagInput, setTagInput] = useState('');

  


// handleContentChange関数の修正
const handleContentChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
) => {
  const value = e.target.value;
  setTask(value);
};

  // handleDetailChange関数の修正
const handleDetailChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
) => {
  const value = e.target.value;
  setDetail(value);
};

  // タスクの期限が変更されたとき
  const handleDeadlineChange = (date: Date | null) => {
    if (date) {
      setDeadline(date);
    }
  };


  const handleChangeTag = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTags(value);
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DialogContent>
        登録するタスクの情報を入力してください。
        <Grid container spacing={6} direction="column">
          <Grid item>
            <TextField
              onChange={handleContentChange}
              margin="dense"
              id="name"
              label="内容"
              value={Task}
              fullWidth
            />
            <TextField
              onChange={handleDetailChange}
              margin="dense"
              id="detail"
              label="詳細"
              value={Detail}
              fullWidth
            />
            <DatePicker
              disablePast
              // openTo="year"
              views={['day']}
              inputFormat="yyyy/MM/dd"
              label="期限"
              value={deadline}
              onChange={handleDeadlineChange}
              renderInput={(params: TextFieldProps) => (
                <TextField {...params} />
              )}
            />
            <TextField
            label="タグを追加"
            onChange={handleChangeTag}
            fullWidth
          />
          </Grid>
        </Grid>
      </DialogContent>
    </LocalizationProvider>
  );
}