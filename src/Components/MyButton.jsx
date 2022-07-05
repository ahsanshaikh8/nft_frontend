import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
const ColorButton = styled(Button)(({ theme }) => ({
  color: "#FFFFFF",
  padding: "10px 2px",
  width: "90%",
  maxWidth: "400px",
  backgroundColor: "#F36E21",
  "&:hover": {
    backgroundColor: "#9d3c04",
  },
  ":disabled":{
    backgroundColor:"#ffff"
  }
}));

export default function MyButton(props) {
  return (
    <ColorButton
      {...props}
      fullWidth
      variant="contained"
    >
      {props.title}
    </ColorButton>
  );
}
