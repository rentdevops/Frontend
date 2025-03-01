import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalHooks } from "../context";
import axios from "axios";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  ThreadsIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
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
  Stack,
  Skeleton,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import Comments from "./Comments";
const shareUrl = "http://localhost:5173/post";
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
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="20%" />
            </>
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
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={400}
              height={400}
            />
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
            {loading ? (
              <>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </CardContent>
          {loading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
            </>
          ) : (
            <>
              <Stack m={4} direction="row" spacing={2}>
                <TwitterShareButton url={`${shareUrl}/${id}`} title={title}>
                  <XIcon size={32} />
                </TwitterShareButton>
                <FacebookShareButton hashtag={title} url={`${shareUrl}/${id}`}>
                  <FacebookIcon size={32} />
                </FacebookShareButton>
                <PinterestShareButton url={`${shareUrl}/${id}`}>
                  <PinterestIcon size={32} />
                </PinterestShareButton>
                <WhatsappShareButton url={`${shareUrl}/${id}`}>
                  <WhatsappIcon size={32} />
                </WhatsappShareButton>
              </Stack>
            </>
          )}
        </Card>

        <hr />
      </div>
      <Comments postId={id} />
    </>
  );
};

export default SinglePost;
