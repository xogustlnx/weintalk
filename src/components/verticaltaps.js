import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ setValue, value ,list }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
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
          label={list[0]}
          sx={{ minHeight: "92px", height: "92px" }}
          {...a11yProps(0)}
        />
        <Tab
          label={list[1]}
          sx={{ minHeight: "92px", height: "92px" }}
          {...a11yProps(1)}
        />
        <Tab
          label={list[2]}
          sx={{ minHeight: "92px", height: "92px" }}
          {...a11yProps(2)}
        />
      </Tabs>
    </Box>
  );
}
