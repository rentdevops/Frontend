import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../axios";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Alert,
  Stack,
  AlertTitle,
} from "@mui/material";
import { Container, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const PostBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorPage, setErrorPage] = useState("");
  const [profile, setProfile] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [open, setOpen] = useState(false);
  const valueChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const navigate = useNavigate();

  const imgupload = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const SubmitBlog = async () => {
    try {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("profile", profile);
      formdata.append("title", inputs.title);
      formdata.append("content", inputs.content);

      const data = await axios.post(
        `http://localhost:4000/api/v1/post/createpost`,

        formdata,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setOpen(true);
    } catch (error) {
      setLoading(false);
      setErrorPage(error?.response.data.message);
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: { sx: "block", md: "flex" },
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          padding: 2,
          backgroundColor: "white",
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "40ch" },
            display: "grid",
            justifyContent: "center",
          }}
          noValidate
          autoComplete="on"
        >
          <Typography color="secondary" variant="h3">
            Create blog
          </Typography>
          <div>
            <TextField
              id="outlined-size-small"
              size="medium"
              placeholder="blog title"
              variant="filled"
              value={inputs.title}
              name="title"
              onChange={valueChange}
            />
          </div>

          <div>
            <TextField
              multiline
              id="outlined-size-small"
              fullWidth
              size="medium"
              variant="filled"
              placeholder="blog content"
              value={inputs.content}
              name="content"
              onChange={valueChange}
            />
            <div className="lectureForm">
              <TextField
                size="medium"
                variant="standard"
                type="file"
                onChange={imgupload}
                name="image"
                accept="image/*"
              />
            </div>
          </div>
          <Button
            disabled={loading}
            onClick={SubmitBlog}
            color="secondary"
            variant="contained"
          >
            Upload.
          </Button>
        </Box>

        <Box mt={4} sx={{ width: "300px", height: "auto" }}>
          <Typography gutterBottom variant="h5">
            Post Review
          </Typography>

          <Typography sx={{ textAlign: "center" }} variant="body1" gutterBottom>
            {inputs.title}
          </Typography>
          {imagePreview && (
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          )}

          <Box sx={{ width: "400px" }}>
            <TextField
              multiline
              id="outlined-size-small"
              fullWidth
              size="medium"
              variant="filled"
              value={inputs.content}
              disabled
            />
          </Box>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Alert severity="success">Blog created!</Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      {errorPage && (
        <Stack sx={{ width: "100%", marginTop: 4 }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorPage}
          </Alert>
        </Stack>
      )}
    </>
  );
};
export default PostBlog;
