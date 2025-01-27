import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalHooks } from "../context";
import axios from "axios";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  CardMedia,
  Box,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import Comments from "./Comments";

const SinglePost = () => {
  const { id } = useParams();
  const { baseurl } = useGlobalHooks();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const FetchPost = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseurl}/post/${id}`);
      setPost(response.data.data);
      setPost(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    }
  };

  useEffect(() => {
    FetchPost();
  }, [id]);

  const { title, content, createdAt, avatar, _id, author, comments } = post;
  const date = new Date(createdAt).toDateString();

  return (
    <>
      <div className="singlePost">
        <Card
          sx={{
            width: { sm: 500, md: 1000 },
          }}
        >
          {loading ? (
            "loading"
          ) : (
            <Box>
              <Typography
                sx={{ fontWeight: 500, fontSize: 18 }}
              >{`${author?.name}`}</Typography>
              <Typography sx={{ fontWeight: 400, fontSize: 12 }}>
                {date}
              </Typography>
            </Box>
          )}
          {loading ? (
            "loading image..."
          ) : (
            <CardMedia
              component="img"
              width="100%"
              sx={{ objectFit: "cover", maxHeight: 500, maxWidth: 500 }}
              image={avatar}
              alt={title}
            />
          )}

          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: "text.primary",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ThumbUp />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
        <hr />
      </div>
      <Comments postId={id} />
    </>
  );
};

export default SinglePost;
