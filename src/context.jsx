import React, { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();
const baseurl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
import "./axios";
import axios from "axios";
const Context = ({ children }) => {
  axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
  axios.defaults.headers.common["Cache-Control"] =
    "no-cache, no-store, must-revalidate";
  axios.defaults.headers.common["Pragma"] = "no-cache";
  axios.defaults.headers.common["Expires"] = "0";

  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState([]);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [input, setInput] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [lovedPost, setLovedPost] = useState(false);
  const [searchPosts, setSearchPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [customError, setCustomError] = useState("");
  const [networkErr, setNetworkErr] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleSearch = async (searchResult) => {
    try {
      const { data } = await axios.get(
        `${baseurl}/post/search/post?result=${searchResult}`
      );
      console.log(data);

      setSearchPosts(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = async () => {
      try {
        const response = await axios.get(`${baseurl}/users/user`);
        console.log(response);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    user();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const { isLogin } = JSON.parse(localStorage.getItem("user"));
      setIsUserLogin(isLogin);
    } else {
      setIsUserLogin(false);
    }
  }, []);
  const posts = async (page) => {
    setLoading(true);
    setNetworkErr(false);
    try {
      setLoading(true);
      const res = await axios.get(`${baseurl}/post?page=${page}`);
      setLoading(false);
      setBlogs(res.data.data);
    } catch (error) {
      setLoading(false);
      setNetworkErr(true);
    }
  };

  const handleLovePost = async (id, likedPost) => {
    setBlogs((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id
          ? {
              ...post,
              likes: post.likes.some((like) => like._id === user._id)
                ? post.likes.filter((like) => like._id !== user._id) // Unlike
                : [...post.likes, { _id: user._id }], // Like
            }
          : post
      )
    );

    try {
      // Send the request to the server
      const { data } = await axios.patch(`${baseurl}/post/likepost/${id}`);
    } catch (error) {
      // In case of error, revert the optimistic update
      console.error(error);
      setBlogs((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id
            ? {
                ...post,
                likes: likedPost.likes, // Revert to the original likes
              }
            : post
        )
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        open,
        toggleDrawer,
        baseurl,
        user,
        isUserLogin,
        input,
        setInput,
        handleSearch,
        setSearchPosts,
        searchPosts,
        openSearchBar,
        setOpenSearchBar,
        lovedPost,
        setLovedPost,
        handleLovePost,
        loading,
        blogs,
        posts,
        customError,
        setCustomError,
        networkErr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalHooks = () => {
  return useContext(AppContext);
};
export default Context;
