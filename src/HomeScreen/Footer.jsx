import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Paper,
  Stack,
  Alert,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useGlobalHooks } from "../context";
import { green } from "@mui/material/colors";
const Footer = ({ input }) => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = useState("");
  const { baseurl, customError, setCustomError } = useGlobalHooks();
  const Suscribe = async () => {
    setLoading(true);
    setCustomError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoading(false);
      setCustomError("Please enter a valid email address");
      return;
    }
    try {
      const { data } = await axios.post(`${baseurl}/newsLetter`, {
        email,
      });
      setLoading(false);
      setMsg(data.message);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setCustomError(error.response?.data || "Something went wrong");
    }
  };
  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
      }, 3000);
    }
  }, [msg]);
  return (
    <Box mt={6} mb={0}>
      <div className={!input ? "lightFooter" : "darkFooter"}>
        <h3 style={{ textAlign: "center" }}>Subscribe to our newsletter</h3>
        <p
          style={{ textAlign: "center", fontWeight: "bold", letterSpacing: 2 }}
        >
          Get the latest updates and exclusive offers.
        </p>
        <div className="newsletter">
          <Paper
            elevation={0}
            sx={{ p: 2, borderRadius: 10, position: "relative" }}
          >
            {customError && (
              <Alert variant="filled" severity="error">
                {customError}
              </Alert>
            )}
            <Box sx={{ width: "80%", height: 50, margin: "0 auto" }}>
              {msg && (
                <Alert variant="filled" severity="success">
                  {msg}
                </Alert>
              )}
              <Box sx={{ position: "absolute", left: 12, top: 2 }}>
                <h1
                  style={{
                    fontWeight: 600,
                    textShadow: "2px 2px #d18d39",
                    fontSize: "12px",
                    color: "black",
                    textAlign: "start",
                  }}
                >
                  TRENDZ
                </h1>
              </Box>
            </Box>
            <h4 style={{ textAlign: "center", margin: "10px 0" }}>
              Unlock your potential
            </h4>
            <p style={{ textAlign: "center" }}>
              Stay informed about our latest products, promotions, and more.
            </p>
            <p style={{ textAlign: "center", color: "gray" }}>
              We respect your privacy and will not share your email address.
            </p>
            <Stack direction="row" spacing={2}>
              <TextField
                variant="outlined"
                color="secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {loading ? (
                <CircularProgress
                  size={40}
                  sx={{
                    color: green[500],
                  }}
                />
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => Suscribe()}
                >
                  Subscribe
                </Button>
              )}
            </Stack>
          </Paper>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
