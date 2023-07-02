import React, { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function ChatTab({ value }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Tabs
        value={0}
        orientation="vertical"
        variant="fullWidth"
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          minHeight: "276px",
          height: "276px",
          width: "120px",
        }}
      >
        <Tab
          label="채팅"
          sx={{ minHeight: "276px", height: "276px" }}
          {...a11yProps(0)}
        />
      </Tabs>
    </Box>
  );
}
