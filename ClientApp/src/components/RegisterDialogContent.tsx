import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

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
  const handleDeadlineChange = (date: any) => {
    setDeadline(date);
  };

  return (
    // このタグ内にある部分が pickers のカバーする範囲になる 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DialogContent>
        
          登録するタスクの情報を入力してください。
       
        <Grid container spacing={6} direction="column">
          <Grid item>
            <TextField
              onChange={handleContentChange}
              margin="dense"
              id="name"
              label="内容"
              fullWidth   // 横幅いっぱいにする }
            />
            <TextField
              onChange={handleDetailChange}
              margin="dense"
              id="detail"
              label="詳細"
              fullWidth   // 横幅いっぱいにする }
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"          // カレンダーが出現する位置 }
              format="yyyy/MM/dd"       // 表示する日付のフォーマット }
              minDate={new Date()}      // 現在の日より前の日は選択不可 }
              margin="normal"
              id="date-picker-inline"
              label="期限"
              value={deadline}
              onChange={date => handleDeadlineChange(date)}
              invalidDateMessage="無効な形式です"
              minDateMessage="昨日以前の日付を指定することはできません"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </MuiPickersUtilsProvider>
  );
}