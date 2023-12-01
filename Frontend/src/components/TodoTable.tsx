import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { tasksState, Task } from '../atoms/Tasks';

import { styled } from '@mui/system';

const TableWrapper = styled(Table)({
  minWidth: 650,
});

const CompleteCell = styled(TableCell)({
  paddingLeft: '20px',
});

const HorizontalTextCell = styled(TableCell)({
  writingMode: 'horizontal-tb',
  paddingLeft: '20px',
});

const CompletedTaskCell = styled(TableCell)({
  textDecoration: 'line-through',
});

const TagCell = styled(TableCell)({
  display: 'flex',
  flexWrap: 'wrap',
});

const Tag = styled('span')({
  margin: '4px',
});

export default function TodoTable() {
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
            tags: updatedTags,
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
      <TableWrapper>
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
                <CompleteCell padding="checkbox">
                  <Checkbox
                    checked={task.isComplete}
                    onChange={() => handleCheck(index)}
                  />
                </CompleteCell>
                <TableCell>
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
                <HorizontalTextCell>
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
                </HorizontalTextCell>
                <TableCell>
                  {editingIndex === index ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disablePast
                        value={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        inputFormat="yyyy/MM/dd"
                        renderInput={(params: any) => (
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
                <TagCell>
                  {task.tags ? task.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>
                      {tag}
                    </Tag>
                  )) : ''}
                </TagCell>
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
      </TableWrapper>
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