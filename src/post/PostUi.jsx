import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { Button, Pagination, Skeleton, Stack } from "@mui/material";
import { useGlobalHooks } from "../context";

export default function Blog({ post }) {
  const { author, title, content, avatar, likes, comment, _id, createdAt } =
    post;
  const date = new Date(createdAt).toDateString();
  const {
    setOpenSearchBar,
    lovedPost,
    setLovedPost,
    loading,
    handleLovePost,
    user,
    isUserLogin,
  } = useGlobalHooks();
  return (
    <Card sx={{ width: 365 }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user?.name?.substring(0, 1).toUpperCase()}
            </Avatar>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            title
          )
        }
        subheader={
          loading ? <Skeleton animation="wave" height={10} width="40%" /> : date
        }
      />
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={300}
          height={150}
        />
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={avatar}
          alt="Paella dish"
        />
      )}
      <CardContent>
        {loading ? (
          <>
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`${content.substring(0, 50)}...`}
            <Button
              variant="text"
              sx={{ textTransform: "capitalize", fontSize: "16px" }}
              onClick={() => setOpenSearchBar(false)}
            >
              <Link to={`/post/${_id}`}>Read more</Link>
            </Button>
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {loading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={20}
            height={20}
          />
        ) : (
          <IconButton
            disabled={!isUserLogin}
            onClick={() => handleLovePost(_id)}
            aria-label="add to favorites"
          >
            <span>{post.likes.length}</span>
            {post.likes.find((userId) => userId._id == user?._id) ? (
              <>
                <FavoriteIcon sx={{ color: "red" }} />
              </>
            ) : (
              <FavoriteIcon sx={{ color: "gray" }} />
            )}
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
