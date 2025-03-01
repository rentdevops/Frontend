import React, { useEffect, useState } from "react";
import Blog from "./PostUi";

import {
  Box,
  Container,
  Grid2,
  Pagination,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import PostLoader from "./PostLoader";
import { useGlobalHooks } from "../context";

const AllPost = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { blogs, loading, posts, lovedPost } = useGlobalHooks();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  useEffect(() => {
    posts(page);
  }, [page]);

  return (
    <>
      <Box>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "fantasy",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Trending Gist.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* {loading ? <PostLoader /> : null} */}
        <Grid2 container spacing={2}>
          {blogs.map((post) => (
            <Item key={post._id}>
              <Grid2 size={{ xs: 12, md: 4, sm: 6 }}>
                <Blog post={post} postId={post._id} />
              </Grid2>
            </Item>
          ))}
        </Grid2>
      </Box>
      <Box
        color="bisque"
        mt={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Paper>
          <Stack spacing={2}>
            <Pagination
              count={10}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default AllPost;
