import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";


export default function Input({label, setValue, placeholder}){
    return  <div>
    <TextField
      id="standard-input"
      label={label}
      onChange={e=>setValue(e.target.value)}
      placeholder={placeholder}
      variant="standard"
    />
  </div>
}