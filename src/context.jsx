import React, { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();
const baseurl = "http://localhost:4000/api/v1";
import "./axios";
import axios from "axios";
const Context = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState([]);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [input, setInput] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    const user = async () => {
      try {
        const response = await axios.get(`${baseurl}/users/user`);
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
