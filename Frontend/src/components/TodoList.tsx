import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import RegisterDialog from './RegisterDialog';
import { useRecoilValue } from 'recoil';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TodoTable from './TodoTable';
import { tasksState } from '../atoms/Tasks';

const FabWrapper = styled(Fab)(({theme}) => ({
  position: 'absolute',
  bottom: '2rem',
  right: '2rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.main, // テーマのプライマリ色を使用
  }
}));

const ButtonWrapper = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function TodoList() {
  //const classes = useStyles();
  const tasks = useRecoilValue(tasksState);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box padding="2rem" textAlign="center">
        {tasks.length !== 0 ? (
          <>
            <TodoTable />
            <FabWrapper
              onClick={handleOpen}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </FabWrapper>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" gutterBottom>
              まだ登録されたタスクはありません。
            </Typography>
            <ButtonWrapper
              onClick={handleOpen}
              variant="contained"
              color="primary"
            >
              タスクを登録する
            </ButtonWrapper>
          </>
        )}
      </Box>
      <RegisterDialog open={open} onClose={handleClose} />
    </>
  );
}