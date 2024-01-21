import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const QuantityModal = ({ maxQuantity, open, handleClose, handleSubmit }) => {
  const [quantity, setQuantity] = useState(0);

  const onChange = (e) => {
    const value = Math.min(Math.max(0, Number(e.target.value)), maxQuantity);
    setQuantity(value);
  };

  const onConfirm = () => {
    handleSubmit(quantity);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Quantity</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          value={quantity}
          onChange={onChange}
          inputProps={{ max: maxQuantity, min: 0 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuantityModal;
