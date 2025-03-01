import { Box, LinearProgress } from "@mui/material";
import React from "react";

const PostLoader = () => {
  return (
    <Box>
      <Box
        sx={{
          height: 200,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearProgress />
        <h1>loading....</h1>
      </Box>
    </Box>
  );
};

export default PostLoader;
