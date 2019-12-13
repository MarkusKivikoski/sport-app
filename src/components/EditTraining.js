import React, { useState } from "react";
import "react-table/react-table.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

export default function EditTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    duration: null,
    activity: ""
  });

  const handleChange = e => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
      date: props.training.date,
      duration: props.training.duration,
      activity: props.training.activity
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editTraining = () => {
    props.updateTraining(training, props.training.links[0].href);
    handleClose();
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit this training</DialogContentText>
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
          <Button onClick={editTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
