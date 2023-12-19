import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { format, isPast } from 'date-fns';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
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
import { Chip } from '@mui/material';
import { getToken } from "../config/authConfig"

import { tasksState, Task } from '../atoms/Tasks';

const TableWrapper = styled(Table)({
  minWidth: 650,
});

const CompleteCell = styled(TableCell)({
  paddingLeft: '20px',
});

const ExpiredTaskRow = styled(TableRow)({
  backgroundColor: '#ffcccc', // Style for expired tasks
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
  const [editingContent, setEditingContent] = useState<string>('');
  const [editingDetail, setEditingDetail] = useState<string>('');
  const [editingTags, setEditingTags] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

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
    const task = tasks[index]
    setEditingIndex(index);
    setEditingContent(task.task);
    setEditingDetail(task.detail);
    setEditingTags(task.tags);
    setSelectedDate(task.deadline);

    
  };

  async function updateTaskInDatabase(task) {
    const accessToken = await getToken();
    try {
      const response = await fetch(`https://localhost:7256/api/content/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(task)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  }
  
  const handleSave = async (index: number) => {
    const updatedTask = {
      ...tasks[index],
      task: editingContent,
      detail: editingDetail,
      deadline: selectedDate,
      tags: editingTags,
    };
  
    const isUpdated = await updateTaskInDatabase(updatedTask);
    if (isUpdated) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task, i) =>
          i === index ? updatedTask : task
        );
        return updatedTasks;
      });
      setEditingIndex(-1);
    }
  };

  const openDeleteDialog = (index: number) => {
    setOpenDeleteModal(true);
  };


  async function deleteTaskFromDatabase(taskId) {
    const accessToken = await getToken();
    try {
      await fetch(`https://localhost:7256/api/content/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }
  
  const handleConfirmDelete = async () => {
    if (editingIndex >= 0 && editingIndex < tasks.length) {
      const taskToDelete = tasks[editingIndex];
      const isDeleted = await deleteTaskFromDatabase(taskToDelete.id);
      if (isDeleted) {
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks];
          updatedTasks.splice(editingIndex, 1);
          return updatedTasks;
        });
      }
      setEditingIndex(-1);
      setOpenDeleteModal(false);
    } else {
      console.error('削除対象のタスクが見つかりません。');
    }
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
            <TableCell>編集／削除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {tasks && tasks.map((task, index) => {
            const isExpired = task.deadline && isPast(new Date(task.deadline));
            const TableRowComponent = isExpired ? ExpiredTaskRow : TableRow;

            return (
              <TableRowComponent key={task.id}>
                <CompleteCell padding="checkbox">
                  <Checkbox
                    checked={task.isComplete}
                    onChange={() => handleCheck(index)}
                  />
                </CompleteCell>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                  ) : (
                    task.task
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      value={editingDetail}
                      onChange={(e) => setEditingDetail(e.target.value)}
                    />
                  ) : (
                    task.detail
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disablePast
                        value={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        inputFormat="yyyy/MM/dd"
                        renderInput={(params) => (
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
                    task.deadline ? format(new Date(task.deadline), 'yyyy/MM/dd') : '日付なし'
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <TextField
                      value={editingTags}
                      onChange={(e) => setEditingTags(e.target.value)}
                    />
                  ) : (
                    <Chip label={String(task.tags)} /> 
                  )}
                </TableCell>
                <TableCell align="center">
                  {editingIndex === index ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(index)}
                    >
                      保存
                    </Button>
                  ) : (
                    <>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(index)}>
                        編集
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => openDeleteDialog(index)}>
                        削除
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRowComponent>
            );
          })}
        </TableBody>
      </TableWrapper>
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>タスクの削除</DialogTitle>
        <DialogContent>
          <p>本当にこのタスクを削除しますか？</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
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