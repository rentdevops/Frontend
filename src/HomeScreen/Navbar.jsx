import React, { useEffect, useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { AccountCircle, Search, AddCircleOutlined } from "@mui/icons-material";
import ToggleNav from "./ToggleNav";
import { Link, NavLink } from "react-router-dom";
import { useGlobalHooks } from "../context";
import TemporaryDrawer from "./Drawer";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const { toggleDrawer } = useGlobalHooks();
  const navCtrl = () => {
    setDisplay(!display);
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
              <h1>logo</h1>
            </div>
          </NavLink>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "block", color: "white" },
            }}
          >
            <TextField
              id="input-with-icon-textfield"
              variant="filled"
              color="secondary"
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearchResult(e.target.value)}
              value={searchResult}
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

          <div className="menu">
            <div>
              <Box
                sx={{
                  display: { xs: "block", sm: "block", md: "none" },
                  marginLeft: 4,
                }}
              >
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="secondary"
                  onClick={navCtrl}
                >
                  <Search sx={{ fontSize: 34 }} />
                </IconButton>
              </Box>
            </div>
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
      <ToggleNav display={display} />
      <TemporaryDrawer />
    </div>
  );
};

export default Navbar;
