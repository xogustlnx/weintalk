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
  setAnswer,
}) {
  const [text, setText] = useState("");

  const handleSubmit = async (target, e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await fetch("../api/prompting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: target}),
      });
      console.log(JSON.stringify({ question: target }));

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      setAnswer(data.result);
      setChats(chats.concat({ id: id, children: data.result }));
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === "") {
        return;
      }
      setChats(chats.concat({ id: id, children: e.target.value, me: true }));
      setText("");
      handleSubmit(e.target.value);
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
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        variant={variant ? variant : "standard"}
        sx={{ width: length ? length : "220px" }}
        helperText={helperText}
        disabled={disabled}
        onKeyPress={onKeyPress && handleKeyPress}
        value={text}
      />
    </div>
  );
}
