import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({ open, title, content, onClose, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => {onClose();
            console.log("Cancel clicked");
        }} color="secondary">Cancel</Button>
        <Button onClick={onConfirm} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
