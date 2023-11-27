import { useState } from 'react';
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
import DatePicker from './DatePicker'; // カレンダーコンポーネントを追加

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
});

export default function TodoTable() {
  const classes = useStyles();
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 選択された日付を管理

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
  };

  const handleSave = (index: number, updatedContent: string, updatedDetail: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            content: updatedContent,
            detail: updatedDetail,
            deadline: selectedDate, // 選択された日付を保存
          };
        }
        return task;
      });
      return updatedTasks;
    });
    setEditingIndex(-1);
  };

  const handleDelete = (index: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      return updatedTasks;
    });
  };

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.horizontalText}>完了</TableCell>
            <TableCell>タスク</TableCell>
            <TableCell align="left">詳細</TableCell>
            <TableCell align="right">期日</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
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
                  <DatePicker
                    selected={task.deadline}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                  />
                ) : (
                  format(task.deadline, 'yyyy/MM/dd')
                )}
              </TableCell>
              <TableCell align="center">
                {editingIndex === index ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(index, task.content, task.detail)}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}