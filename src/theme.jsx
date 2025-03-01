import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#090979",
    },
    secondary: {
      main: "#d18d39",
    },
    tetiary: {
      main: "#1A2027",
    },
  },
  colorSchemes: {
    dark: true,
  },
});

export default theme;
