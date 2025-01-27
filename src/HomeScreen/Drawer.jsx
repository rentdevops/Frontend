import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AccountBox, Person, UsbRounded } from "@mui/icons-material";
import { useGlobalHooks } from "../context";
import { Link } from "react-router-dom";
import Switch from "./Switch";
import CustomizedSwitches from "./Switch";
import SwitchComponent from "./Switch";

export default function TemporaryDrawer() {
  const { open, toggleDrawer, isUserLogin } = useGlobalHooks();
  const Logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/sign";
  };
  const DrawerList = (
    <Box>
      <SwitchComponent />
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        <Link to="/sign">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => Logout()}>
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary={isUserLogin ? "SignOut" : "SignIn"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Link>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
