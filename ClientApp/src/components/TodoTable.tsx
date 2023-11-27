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
    paddingLeft: '20px'
  },
});

export default function TodoTable() {
  const classes = useStyles();
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);

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

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.horizontalText}>完了</TableCell>
            <TableCell>タスク</TableCell>
            <TableCell align="left">詳細</TableCell>
            <TableCell align="right">期日</TableCell>
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
                {task.content}
              </TableCell>
              <TableCell className={task.isComplete ? classes.completedTask : ''} align="left" >{task.detail}</TableCell>
              <TableCell className={task.isComplete ? classes.completedTask : ''} align="right">{format(task.deadline, 'yyyy/MM/dd')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}