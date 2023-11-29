import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { tasksState, Task } from '../atoms/Tasks';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  completeCell: {
    paddingLeft: '20px',
  },
  completedTask: {
    textDecoration: 'line-through',
  },
  horizontalText: {
    writingMode: 'horizontal-tb',
    paddingLeft: '20px',
  },
  tagCell: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    margin: '4px',
  },
});

export default function TodoTable() {
  const classes = useStyles();
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<(() => void) | null>(null);

  const handleCheck = (index: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            isComplete: !task.isComplete,
          };
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setSelectedDate(tasks[index].deadline);
  };

  const handleSave = (index: number, updatedContent: string, updatedDetail: string, updatedTags: string[]) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            content: updatedContent,
            detail: updatedDetail,
            deadline: selectedDate,
            tags: updatedTags, // タグの状態を更新
          };
        }
        return task;
      });
      return updatedTasks;
    });
    setEditingIndex(-1);
  };
  const handleConfirmDelete = () => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(editingIndex, 1);
      return updatedTasks;
    });
    setEditingIndex(-1);
    setOpenDeleteModal(false);
  };

  const handleDelete = (index: number) => {
    setEditingIndex(index);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  if (!tasks) {
    setTasks([]);
  }

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>完了</TableCell>
            <TableCell>タスク</TableCell>
            <TableCell>詳細</TableCell>
            <TableCell>期日</TableCell>
            <TableCell>タグ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks ? (
            tasks.map((task, index) => (
              <TableRow key={task.id}>
                <TableCell className={classes.completeCell} padding="checkbox">
                  <Checkbox
                    checked={task.isComplete}
                    onChange={() => handleCheck(index)}
                  />
                </TableCell>
                <TableCell className={task.isComplete ? classes.completedTask : ''}>
                  {editingIndex === index ? (
                    <TextField
                      value={task.content}
                      onChange={(e) => {
                        const updatedContent = e.target.value;
                        setTasks((prevTasks) => {
                          const updatedTasks = prevTasks.map((t, i) => {
                            if (i === index) {
                              return {
                                ...t,
                                content: updatedContent,
                              };
                            }
                            return t;
                          });
                          return updatedTasks;
                        });
                      }}
                    />
                  ) : (
                    task.content
                  )}
                </TableCell>
                <TableCell className={task.isComplete ? classes.completedTask : ''} align="left">
                  {editingIndex === index ? (
                    <TextField
                      value={task.detail}
                      onChange={(e) => {
                        const updatedDetail = e.target.value;
                        setTasks((prevTasks) => {
                          const updatedTasks = prevTasks.map((t, i) => {
                            if (i === index) {
                              return {
                                ...t,
                                detail: updatedDetail,
                              };
                            }
                            return t;
                          });
                          return updatedTasks;
                        });
                      }}
                    />
                  ) : (
                    task.detail
                  )}
                </TableCell>
                <TableCell className={task.isComplete ? classes.completedTask : ''} align="right">
                  {editingIndex === index ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disablePast
                        value={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        inputFormat="yyyy/MM/dd"
                        renderInput={(params:any) => (
                          <TextField
                            {...params}
                            variant="standard"
                            type="text"
                            value={params.value}
                            onChange={params.onChange}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  ) : (
                    format(task.deadline, 'yyyy/MM/dd')
                  )}
                </TableCell>
                <TableCell className={classes.tagCell}>
                {task.tags ? task.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={classes.tag}>
                    {tag}
                  </span>
                )) : ""}
              </TableCell>
                <TableCell align="center">
                  {editingIndex === index ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(index, task.content, task.detail, task.tags)}
                    >
                      保存
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(index)}>
                        編集
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(index)}>
                        削除
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>タスクがありません</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>タスクの削除</DialogTitle>
        <DialogContent>
          <p>本当にこのタスクを削除しますか？</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}