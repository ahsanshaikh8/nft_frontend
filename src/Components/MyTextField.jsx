import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  width: "90%",
  maxWidth: "400px",
  borderRadius: "10px !important",
  input: {
    color: "white",
  },
  marginBottom: "24px",
  "& label.Mui-focused": {
    color: "white",
  },
  "label + &": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset::placeholder": {
      color: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    
  },
});
export default function MyTextField(props) {
  return <CssTextField {...props} fullWidth />;
}
