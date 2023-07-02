import React, { useState } from "react";

import { TextField } from "@mui/material";

export default function Input({
  label,
  setValue,
  placeholder,
  error,
  helperText,
  disabled,
  variant,
  length,
  onKeyPress,
  setChats,
  chats,
  id,
  setQuestion,
  loading
}) {
  const [text, setText] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        return;
      }
      setChats(chats.concat({ id: id.current, children: e.target.value, me: true }));
      setText("");
      setQuestion(e.target.value);
      id.current += 1;
    }
  };

  return (
    <div>
      <TextField
        error={error}
        id="standard-input"
        label={label}
        onChange={(e) => {
          setText(e.target.value);
          setValue && setValue(e.target.value);
        }}
        placeholder={placeholder}
        variant={variant ? variant : "standard"}
        sx={{ width: length ? length : "220px" }}
        helperText={helperText}
        disabled={disabled || loading}
        onKeyPress={onKeyPress && handleKeyPress}
        value={text}
      />
    </div>
  );
}
