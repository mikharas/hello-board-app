import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

const WarningDialogue = ({
  open, onClose, onContinue, msg,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Warning!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onContinue} color="primary">
          Yes
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(WarningDialogue);
