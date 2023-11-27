import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextFieldProps } from '@mui/material';


import {
  taskContentState,
  taskDetailState,
  taskDeadlineState,
} from '../atoms/RegisterDialogContent';

export default function RegisterDialogContent() {
  // atom から state を取得する
  const setContent = useSetRecoilState(taskContentState);
  const setDetail = useSetRecoilState(taskDetailState);
  const [deadline, setDeadline] = useRecoilState(taskDeadlineState);

  // タスクの内容が変更されたとき
  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setContent(e.target.value);
  };

  const handleDetailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDetail(e.target.value);
  };

  // タスクの期限が変更されたとき
  const handleDeadlineChange = (date: Date | null) => {
    if (date) {
      setDeadline(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DialogContent>
        登録するタスクの情報を入力してください。
        {/* <Grid container spacing={6} direction="column"> */}
          {/* <Grid item> */}
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
            views={['day']}          // カレンダーが出現する位置 }
            // format="yyyy/MM/dd"       // 表示する日付のフォーマット }
            // minDate={new Date()}      // 現在の日より前の日は選択不可 }
            // margin="normal"
            // id="date-picker-inline"
            inputFormat="yyyy/MM/dd"
            label="期限"
            value={deadline}
            onChange={handleDeadlineChange}
            renderInput={(params: TextFieldProps) => (
              <TextField {...params} />
            )}
            // invalidDateMessage="無効な形式です"
            // minDateMessage="昨日以前の日付を指定することはできません"
          />
          {/* </Grid> */}
        {/* </Grid> */}
      </DialogContent>
    </LocalizationProvider>
  );
}