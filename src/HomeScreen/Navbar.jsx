import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  TextField,
  Paper,
} from "@mui/material";
import { AccountCircle, Search, AddCircleOutlined } from "@mui/icons-material";
import ToggleNav from "./ToggleNav";
import { Link, NavLink } from "react-router-dom";
import { useGlobalHooks } from "../context";
import TemporaryDrawer from "./Drawer";
import SearchPost from "./SearchPost";
import axios from "axios";

const Navbar = () => {
  const { toggleDrawer, openSearchBar, setOpenSearchBar, isUserLogin } =
    useGlobalHooks();

  const handleClickOpen = () => {
    setOpenSearchBar(true);
  };
  return (
    <div>
      <div className="navber">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <NavLink to="/">
            <div className="logo">
              <h1
                style={{
                  fontWeight: 600,
                  textShadow: "2px 2px white",
                  fontSize: "24px",
                  color: "black",
                }}
              >
                TRENDZ
              </h1>
            </div>
          </NavLink>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "block", color: "white" },
            }}
          ></Box>

          <div className="menu">
            <div>
              <Box
                sx={{
                  marginLeft: 4,
                }}
              >
                <SearchPost />
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  <Search sx={{ fontSize: 34 }} />
                </IconButton>
              </Box>
            </div>
            {isUserLogin ? (
              <div>
                <Link to="/create_blog">
                  <Box
                    sx={{
                      display: {},
                    }}
                  >
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-haspopup="true"
                      color="secondary"
                    >
                      <AddCircleOutlined sx={{ fontSize: 34 }} />
                    </IconButton>
                  </Box>
                </Link>
              </div>
            ) : null}

            <div>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="secondary"
                onClick={toggleDrawer(true)}
              >
                <AccountCircle sx={{ fontSize: 34 }} />
              </IconButton>
            </div>
          </div>
        </Box>
      </div>
      <TemporaryDrawer />
    </div>
  );
};

export default Navbar;
