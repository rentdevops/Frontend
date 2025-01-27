import { Switch } from "@mui/material";
import React, { useState } from "react";
import { useGlobalHooks } from "../context";
const SwitchComponent = () => {
  const { input, setInput } = useGlobalHooks();
  const handleChange = (nextChecked) => {
    setInput(nextChecked.target.checked);
  };

  return (
    <div className="example">
      <label>
        <Switch
          onChange={handleChange}
          checked={input}
          className="react-switch"
        />
      </label>
    </div>
  );
};

export default SwitchComponent;
