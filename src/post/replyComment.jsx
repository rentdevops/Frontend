import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useGlobalHooks } from "../context";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
const ReplyComment = ({ open, handleClose, commentId }) => {
  const { baseurl } = useGlobalHooks();
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get(
          `${baseurl}/comment/singleComment/${commentId}`
        );
        setComment(response.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    data();
  }, [commentId]);

  useEffect(() => {
    const fetchReplies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseurl}/reply/${commentId}`);
        setReplies(response.data.message);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchReplies();
  }, [commentId]);

  const handleReplySubmit = () => {
    if (!reply) {
      return;
    }
    const data = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${baseurl}/reply/${commentId}`, {
          reply,
        });
        setReplies([...replies, response.data.data]);
        setReply("");
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    data();
  };
  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ fontSize: 10, fontWeight: 400 }} mr={6}>
              <Typography>{comment.commentedBy?.name}</Typography>
              {new Date(comment.createdAt).toLocaleDateString()} at{" "}
              {new Date(comment.createdAt).toLocaleTimeString()}
            </Box>
            <Box>
              <Typography></Typography>
              {comment.content}
            </Box>
          </Box>
          <br />
          <Divider>
            <Box sx={{ fontSize: 12, fontWeight: 500 }}>Replies</Box>
          </Divider>
          <Box>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : replies.length === 0 ? (
              <Typography variant="body2">No replies yet.</Typography>
            ) : (
              replies?.map((reply) => (
                <Box
                  key={reply._id}
                  sx={{
                    display: "flex",
                    marginTop: 6,
                  }}
                >
                  <Box sx={{ fontSize: 10, fontWeight: 400 }} mr={12}>
                    <Typography>{reply.replyBy?.name}</Typography>
                    {new Date(reply.createdAt).toLocaleDateString()} at{" "}
                    {new Date(reply.createdAt).toLocaleTimeString()}
                  </Box>
                  <Box>
                    <Typography variant="body1">{reply.reply}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack direction="row" spacing={4}>
            <TextField
              sx={{ marginTop: 6 }}
              required
              margin="dense"
              type="text"
              fullWidth
              variant="standard"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              label="Reply"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleReplySubmit();
                }
              }}
              disabled={loading}
            />
            <Button
              onClick={() => handleReplySubmit()}
              disabled={loading}
              color="success"
              type="submit"
            >
              Reply
            </Button>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ReplyComment;
