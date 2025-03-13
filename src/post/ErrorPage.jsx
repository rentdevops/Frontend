import React from "react";
import { WifiTetheringError } from "@mui/icons-material";
import { Button } from "@mui/material";

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div>
          <div>
            <WifiTetheringError sx={{ fontSize: 100 }} />
          </div>
          <h2>Network Error</h2>
          <p>Please check your internet connection and try again.</p>{" "}
          <Button onClick={() => handleRefresh()}>Refresh</Button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
