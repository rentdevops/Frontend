import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUpForm from "./Account/sign.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Context from "./context.jsx";
import Layout from "./Layout.jsx";
import PostBlog from "./post/uploadPost.jsx";
import PasswdReset from "./Account/passwdReset.jsx";
import OTPReset from "./Account/Otp.jsx";
// import SinglePost from "./post/SinglePost.jsx"
const SinglePost = lazy(() => import("./post/SinglePost"));
const App = lazy(() => import("./App.jsx"));
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Context>
        <BrowserRouter>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Child Routes */}
                <Route index element={<App />} />
                <Route path="/sign" element={<SignInUpForm />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/create_blog" element={<PostBlog />} />
                <Route path="/passwdReset" element={<OTPReset />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Context>
    </ThemeProvider>
  </StrictMode>
);
