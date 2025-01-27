import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import OTPReset from "./Otp";

const PasswdReset = ({ email }) => {
  const [togglePage, setTogglePage] = useState(false);

  const Reset = () => [];

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
            />
          </Box>
          <Box mt={2}>
            <TextField
              size="medium"
              color="secondary"
              type="password"
              placeholder="confirm password"
            />
          </Box>
          <Box mt={2}>
            <Button variant="contained" type="submit">
              Done
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default PasswdReset;
