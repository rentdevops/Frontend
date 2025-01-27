import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./HomeScreen/Navbar";
import { Box, useColorScheme } from "@mui/material";
import { useGlobalHooks } from "./context";

const Layout = () => {
  const { mode, setMode } = useColorScheme();
  const { input } = useGlobalHooks();

  useEffect(() => {
    setMode(input ? "dark" : "light");
  }, [input]);
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <div className={input ? "mainScreen" : "mainScreenDark"}>
        <Navbar />
        <Outlet />
      </div>
    </Box>
  );
};

export default Layout;
