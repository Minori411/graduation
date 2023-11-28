import React from 'react';
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
} from '../atoms/RegisterDialogContent';


export default function RegisterDialogContent() {
  const setContent = useSetRecoilState(taskContentState);
  const setDetail = useSetRecoilState(taskDetailState);
  const [deadline, setDeadline] = useRecoilState(taskDeadlineState);
  const [tags, setTags] = useState<string[]>([]);
  const setTasks = useSetRecoilState(tasksState); 

  // handleContentChange関数の修正
// handleContentChange関数の修正
const handleContentChange = (
  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
) => {
  const value = e.target.value;
  setContent(value);
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

  // タグが追加されたとき
  const handleAddTag = (value: string) => {
    if (value.trim() !== '') {
      setTags((prevTags) => [...prevTags, value.trim()]);
    }
  };

  // タグが削除されたとき
  const handleDeleteTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
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
              fullWidth
            />
            <TextField
              onChange={handleDetailChange}
              margin="dense"
              id="detail"
              label="詳細"
              fullWidth
            />
            <DatePicker
              disablePast
              openTo="year"
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
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleAddTag(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            fullWidth
          />
            <div>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(index)}
                  style={{ marginRight: 8 }}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </LocalizationProvider>
  );
}