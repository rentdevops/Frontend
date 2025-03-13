import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Drawer,
  Stack,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useGlobalHooks } from "../context";
import axios from "axios";
const SignInUpForm = () => {
  const { baseurl } = useGlobalHooks();
  const [isSignInMode, setIsSignInMode] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    bio: "",
    password: "",
    email: "",
    confirmpasswd: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, bio, name, confirmpasswd } = formData;

    if (!email || !password || !name) return;
    if (bio.length < 100) {
      setErrMsg("Bio should exceed 100 characters.");
      return;
    }
    if (password !== confirmpasswd) {
      setErrMsg("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const login = await axios.post(`${baseurl}/users/create_account`, {
        name,
        email,
        password,
        bio,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ token: login.data.token, isLogin: true })
      );

      window.location.href = "/";
    } catch (error) {
      setIsLoading(false);

      console.error(error);
      setErrMsg(error.response.data.message);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return;
    setIsLoading(true);

    try {
      const login = await axios.post(`${baseurl}/users/login`, {
        email,
        password,
      });
      console.log(login);

      localStorage.setItem(
        "user",
        JSON.stringify({ token: login.data.token, isLogin: true })
      );

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      setErrMsg(error.response.data.message);
    }
  };

  const toggleMode = () => {
    setIsSignInMode(!isSignInMode);
    setErrMsg("");
    setFormData({ ...formData, password: "", confirmpasswd: "" });
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Paper elevation={6}>
        <Stack sx={{ width: "100%", marginBottom: 4 }} spacing={2}>
          {errMsg && (
            <Alert variant="filled" severity="error">
              {errMsg}
            </Alert>
          )}
        </Stack>

        {!isSignInMode && (
          <TextField
            name="name"
            label="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            fullWidth
          />
        )}

        <TextField
          onChange={handleChange}
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
        />
        <Box mb={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              value={formData.password}
              onChange={handleChange}
              name="password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
        {!isSignInMode && (
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="confirmPassword">ConfirmPassword</InputLabel>
            <OutlinedInput
              value={formData.confirmpasswd}
              onChange={handleChange}
              name="confirmpasswd"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="ConfirmPassword"
            />
          </FormControl>
        )}

        {!isSignInMode && (
          <TextField
            multiline
            rows={4}
            fullWidth
            value={formData.bio}
            label="I
            Am john doe a software engineer...."
            required
            name="bio"
            onChange={handleChange}
            sx={{ marginTop: 2 }}
            helperText="Must Exceed 100  Words"
          />
        )}

        {isSignInMode ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            onClick={(event) => handleLogin(event)}
          >
            Sign In
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            onClick={(event) => handleSubmit(event)}
          >
            Sign up
          </Button>
        )}

        {isSignInMode && (
          <Box m={2}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: "center" }}
              gutterBottom
            >
              or
            </Typography>
            <Link to="/passwdReset" variant="body2">
              Forgot Password?
            </Link>
          </Box>
        )}
        <Button variant="text" color="secondary" fullWidth onClick={toggleMode}>
          {isSignInMode
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Button>
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
          <Link to="#" variant="body2">
            Terms & Conditions
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignInUpForm;
