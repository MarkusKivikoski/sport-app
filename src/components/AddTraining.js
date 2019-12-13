import React, { useState } from "react";
import "react-table/react-table.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: null,
    activity: "",
    customer: ""
  });

  const handleChange = e => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ margin: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Add a training
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the information of a new training
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            type="datetime-local"
            value={training.date}
            onChange={e => handleChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleChange(e)}
            label="Duration"
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleChange(e)}
            label="Activity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
