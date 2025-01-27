import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ReplyComment = ({ open, handleClose, commentId }) => {
  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle>replies</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="success" type="submit">
            Post
          </Button>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ReplyComment;
