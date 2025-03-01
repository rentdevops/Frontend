import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import OTPReset from "./Otp";
import axios from "axios";
import { useGlobalHooks } from "../context";

const PasswdReset = ({ email }) => {
  const [togglePage, setTogglePage] = useState(false);
  const [newPasswd, setNewPasswd] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [resetFeedback, setResetFeedback] = useState(false);
  const [message, setMessage] = useState("");
  const { baseurl } = useGlobalHooks();
  const Reset = async () => {
    try {
      if (newPasswd !== confirmPasswd) {
        setErrorMsg("password doesn't match !!");

        return;
      }
      const { data } = await axios.patch(`${baseurl}/users/updatepassword`, {
        email,
        password: newPasswd,
      });
      if (data) {
        setResetFeedback(true);
        setMessage(
          "Password reset successful. Please login with your new password."
        );
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div>
      <Box
        mt={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {errorMsg && (
          <Alert variant="filled" severity="error">
            {errorMsg}
          </Alert>
        )}
        <Paper sx={{ textAlign: "center" }} elevation={3}>
          <h1>Set your new Password</h1>

          <Box mt={2}>
            <TextField
              size="medium"
              color="secondary"
              type="email"
              placeholder="Email"
              value={email}
            />
          </Box>
          <Box mt={2}>
            <TextField
              size="medium"
              color="secondary"
              type="password"
              placeholder="new password"
              value={newPasswd}
              onChange={(e) => setNewPasswd(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              size="medium"
              color="secondary"
              type="password"
              placeholder="confirm password"
              value={confirmPasswd}
              onChange={(e) => setConfirmPasswd(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <Button variant="contained" type="submit" onClick={() => Reset()}>
              Done
            </Button>
          </Box>
        </Paper>
        <Dialog
          open={resetFeedback}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Alert severity="success">{message}</Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => (window.location.href = "/sign")} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default PasswdReset;
