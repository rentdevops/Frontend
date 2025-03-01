import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Blog from "../post/PostUi";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useGlobalHooks } from "../context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchPost({ open, setOpen }) {
  const [searchResult, setSearchResult] = React.useState("");

  const {
    handleSearch,
    searchPosts,
    setSearchPosts,
    openSearchBar,
    setOpenSearchBar,
  } = useGlobalHooks();

  React.useEffect(() => {
    if (searchResult == "") {
      setSearchPosts([]);
    }
  });
  const queryPost = () => {
    if (!searchPosts) {
      return;
    }
    let timeoutId;
    return (e) => {
      const query = e.target.value.trim();
      setSearchResult(query);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleSearch(query);
      }, 1000);
    };
  };

  const handleClose = () => {
    setOpenSearchBar(false);
    setSearchResult("");
    setSearchPosts([]);
  };

  const debounce = React.useMemo(() => queryPost(), []);

  return (
    <React.Fragment>
      <Dialog
        maxWidth="xl"
        open={openSearchBar}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            position: "relative",
          }}
        >
          <InputBase
            placeholder="Search…"
            onChange={debounce}
            value={searchResult}
            // sx={{ width: "20ch" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleClose()}
            sx={{ p: "px", position: "absolute", right: 12 }}
            color="error"
          >
            <Close />
          </IconButton>
        </Paper>
        <DialogTitle id="alert-dialog-slide-title">
          {"Search Results"}
        </DialogTitle>
        <DialogContent>
          {searchPosts.length === 0 && (
            <DialogContentText id="alert-dialog-slide-description">
              No results found.
            </DialogContentText>
          )}
          {searchPosts.map((post) => (
            <Blog key={post._id} post={post} />
          ))}
          {/* <Blog/> */}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
