import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
const ColorButton2 = styled(Button)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  maxWidth: "250px",
  marginTop: "10px",
  marginRight: "10px",
  marginLeft: "10px",
  float: "none",
  borderRadius: "5px",
  backgroundColor: "#c100a3",
  textAlign: "center",
  transition: "all 300ms cubic-bezier(0.19, 1, 0.22, 1)",
  backgroundColor: "#F36E21",
  "&:hover": {
    backgroundColor: "#9d3c04",
  },
  padding: "9px 15px",
  color: "white",
  border: "0",
  lineHheight: "inherit",
  textDecoration: "none",
  cursor: "pointer",
  width: "150px",
}));

export default function MyHomepageButton(props) {
  return (
    <ColorButton2 {...props} fullWidth variant="contained">
      {props.title}
    </ColorButton2>
  );
}
