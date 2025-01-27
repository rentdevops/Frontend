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
import { Pagination, Stack } from "@mui/material";

export default function Blog({ post }) {
  const { author, title, content, avatar, likes, comment, _id, createdAt } =
    post;
  const date = new Date(createdAt).toDateString();

  return (
    <Card sx={{ width: 365 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={title}
        subheader={date}
      />
      <CardMedia
        component="img"
        height="194"
        image={avatar}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${content.substring(0, 50)}...`}
          <Link
            style={{ textTransform: "capitalize", fontSize: "16px" }}
            to={`/post/${_id}`}
          >
            see more
          </Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
