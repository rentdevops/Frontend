import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
  Paper,
} from "@mui/material";
import { ArrowBack, ArrowBackIosNew } from "@mui/icons-material";
import Reset from "./passwdReset";
import { useGlobalHooks } from "../context";
import axios, { Axios } from "axios";

const OTPReset = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [togglePage, setTogglePage] = useState(true);
  const [emailOtp, setEmailOtp] = useState([]);
  const [switchToReset, setSwitchToReset] = useState(true);
  const [email, setEmail] = useState("");
  const { baseurl } = useGlobalHooks();
  const handleTogglePage = async () => {
    const otpNum = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    setEmailOtp([...otpNum]);

    const resp = await axios.post(`${baseurl}/users/email`, {
      email,
      otp: otpNum,
    });
    console.log(resp);

    setTogglePage(!togglePage);
  };
  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    if (otp.join("").length !== otp.length) {
      setError("Please fill all fields");
      return;
    }
    if (emailOtp.join("") == otp.join("")) {
      setSwitchToReset(false);
    }
    // Submit logic here
    setError("");
  };
  if (switchToReset) {
    if (togglePage) {
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
              <h1>Reset Password</h1>
              <h5>
                Enter your email address below to receive a password reset link.
              </h5>

              <Box>
                <TextField
                  color="secondary"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box mt={2}>
                <Button
                  onClick={handleTogglePage}
                  variant="contained"
                  type="submit"
                >
                  Reset Password
                </Button>
              </Box>
            </Paper>
          </Box>
        </div>
      );
    } else {
      return (
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to right, #e3f2fd, #ede7f6)",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "white",
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Button onClick={() => setTogglePage(true)}>
              <ArrowBackIosNew />
            </Button>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Reset Your Password
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              mb={3}
            >
              Enter the OTP sent to your email to continue.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2} justifyContent="center" mb={2}>
              {otp.map((_, index) => (
                <Grid item key={index}>
                  <TextField
                    id={`otp-${index}`}
                    type="text"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target.value, index)}
                    sx={{ width: 50 }}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={otp.some((digit) => !digit)}
            >
              Submit
            </Button>

            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              mt={3}
            >
              Didn’t receive an OTP?{" "}
              <Link href="#" underline="hover" color="primary">
                Resend
              </Link>
            </Typography>
          </Box>
        </Box>
      );
    }
  } else {
    return <Reset email={email} />;
  }
};

export default OTPReset;
