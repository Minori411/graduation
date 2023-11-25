import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { format }   from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

import { tasksState } from '../atoms/Tasks';

export default function TodoTable() {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [selected, setSelected] = useState<number[]>([]);

  // すべてのタスクを選択する
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelected([...Array(tasks.length).keys()]);
      return;
    }
    setSelected([]);
  };

  // 特定のタスクを選択する
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const selectedIndex = selected.indexOf(i);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, i);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // 選択したタスクを消去する
  const handleDelete = () => {
    let newTasks = tasks.filter(
      (e: object, i: number) => selected.indexOf(i) === -1
    );
    setTasks(newTasks);
    setSelected([]);
  };
  return (
    <>
      <IconButton
        onClick={handleDelete}
        disabled={selected.length === 0}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell padding="checkbox">
                <Checkbox
                  checked={tasks.length > 0 && tasks.length === selected.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
            <TableCell>タスク</TableCell>
            <TableCell align="center">詳細</TableCell>
            <TableCell align="center">期日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task: any, index: number) => (
            <TableRow>
              <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(index) !== -1}
                    onChange={(e: any) => handleCheck(e, index)}
                  />
                </TableCell>
              <TableCell>{task.content}</TableCell>
              <TableCell align="center">{task.detail}</TableCell>
              <TableCell align="center">
                {/*// 年/月/日の形式に変換して表示する */}
                {format(task.deadline, 'yyyy/MM/dd')}
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}