import React from "react";

import AllPost from "./post/AllPost";
import TemporaryDrawer from "./HomeScreen/Drawer";
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
} from "@mui/material/styles";
import { Box } from "@mui/material";

const App = () => {
  const { mode, setMode } = useColorScheme();
  // if (!mode) {
  //   return null;
  // }
  return (
    <Box>
      <TemporaryDrawer />
      <AllPost />
    </Box>
  );
};

export default App;
