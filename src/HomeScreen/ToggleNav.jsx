import React from "react";
import { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const ToggleNav = ({ display }) => {
  return (
    <>
      {display ? (
        <Box
          sx={{
            background: "white",
            display: { sm: "flex", md: "none" },
            justifyContent: "center",
          }}
        >
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            color="secondary"
            type="search"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="secondary" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      ) : null}
    </>
  );
};

export default ToggleNav;
