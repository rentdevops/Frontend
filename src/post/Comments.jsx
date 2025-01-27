import { Delete, Edit, MoreVert, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGlobalHooks } from "../context";
import ReplyComment from "./replyComment";

const Comments = ({ postId }) => {
  const [input, setInput] = useState("");
  const [commentList, setCommentList] = useState([]);
  const { baseurl } = useGlobalHooks();
  const [open, setOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [commentId, setCommentId] = useState("");

  const openReply = (id) => {
    setReplyOpen(true);
    setCommentId(id);
  };

  const closeReply = () => {
    setReplyOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const postComment = async () => {
    if (input.trim() == "") {
      return;
    }
    const newComment = await axios.post(`${baseurl}/comment/${postId}`, {
      content: input,
    });

    setCommentList([...commentList, newComment.data.message]);
    setInput("");
  };
  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`${baseurl}/comment/${postId}`);

      setCommentList(response.data.message);
    };
    fetchComments();
  }, []);
  return (
    <div>
      <Box>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <TextField
            variant="outlined"
            type="text"
            placeholder="share your thought"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button
            onClick={postComment}
            disabled={input.trim() == ""}
            variant="contained"
          >
            <Send />
          </Button>
        </Stack>
        <Typography
          gutterBottom
          variant="body1"
          component="h4"
          sx={{ textAlign: "center" }}
          color="secondary"
          mt={4}
        >
          Comments
        </Typography>
        <Box>
          {commentList?.map((comment) => {
            const date = new Date(comment.createdAt).toDateString();

            return (
              <Box sx={{ textTransform: "capitalize" }} key={comment._id}>
                <Paper elevation={2} sx={{ position: "relative" }}>
                  <Stack>
                    <Typography variant="body1 " sx={{ marginRight: 3 }}>
                      {comment?.commentedBy?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: 8 }}>
                      {date}
                    </Typography>
                  </Stack>
                  <Box sx={{ position: "absolute", right: 0, top: 1 }}>
                    <Button
                      variant="text"
                      onClick={() => openReply(comment._id)}
                    >
                      Reply
                    </Button>
                    <Button variant="text" onClick={handleClickOpen}>
                      <MoreVert />
                    </Button>
                  </Box>
                  <Typography variant="body1" sx={{ margin: 3, marginLeft: 8 }}>
                    {comment.content}
                  </Typography>
                </Paper>
              </Box>
            );
          })}
        </Box>
        <ReplyComment
          open={replyOpen}
          handleClose={closeReply}
          commentId={commentId}
        />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <nav aria-label="main mailbox folders">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Delete />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Edit />
                      </ListItemIcon>
                      <ListItemText primary="Edit" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Divider />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Comments;
