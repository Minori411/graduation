import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import RegisterDialogContent from './RegisterDialogContent';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RegisterDialog({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle>タスク登録</DialogTitle>
      <RegisterDialogContent />
      <DialogContent>
        <DialogContentText>
          登録するタスクの情報を入力してください。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          もどる
        </Button>
        <Button color="primary">
          登録
        </Button>
      </DialogActions>
    </Dialog>
  );
}