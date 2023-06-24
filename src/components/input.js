import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export default function Input({
  label,
  setValue,
  placeholder,
  error,
  helperText,
  disabled,
}) {
  return (
    <div>
      <TextField
        error={error}
        id="standard-input"
        label={label}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        variant="standard"
        helperText={helperText}
        disabled={disabled}
      />
    </div>
  );
}
