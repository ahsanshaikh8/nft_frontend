import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import coin from "../Images/MMM-Coin 2.png";
import MyTextField from "./MyTextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MyButton from "./MyButton";
import { setHasCancelledPopUp } from "../Helpers/storage";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function SignUp({ show, closeModal }) {
  const [state, setState] = useState({
    howDoYouKnowUs: "How do you know us?",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 600px)" });
  const handleClose = () => {
    console.log("close");
    setHasCancelledPopUp();
    closeModal();
  };
  let mobileSignUp = (
    <>
      <div>
        <Modal
          style={{ background: "var(--main-bg-color)" }}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title className="title">Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body">
              <div className="avatar" />
              <button
                style={{
                  backgroundColor: "rgba(243, 110, 33, 0.59)",
                  width: "166px",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  margin: "8px",
                }}
              >
                Upload Profile Picture
              </button>
              <MyTextField type="text" name="username" label="Username" />
              <MyTextField type="text" name="email" label="Email" />
              <MyTextField type="text" name="phone" label="Phone Number" />
              <MyTextField type="password" name="password" label="Password" />
              <MyTextField
                type="text"
                name="walletAddress"
                label="Wallet Address"
              />
              <MyTextField
                type="text"
                name="referalCode"
                label="Referral Code"
              />
              <Select
                // displayEmpty
                input={<OutlinedInput />}
                // styles="input"
                value={state.howDoYouKnowUs}
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    howDoYouKnowUs: e.target.value,
                  }));
                }}
                renderValue={(e) => {
                  console.log("e", e);
                  if (e.length === 0) {
                    return "How do you know us?";
                  }
                  return e;
                }}
                style={{ width: "90%", borderColor: "white", color: "white" }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>How do you know us?</em>
                </MenuItem>
                <MenuItem value="First Choice">
                  <em>First Choice</em>
                </MenuItem>
                <MenuItem value="Second Choice">
                  <em>Second Choice</em>
                </MenuItem>
                <MenuItem value="Third Choice">
                  <em>Third Choice</em>
                </MenuItem>
              </Select>{" "}
              <MyButton
                type="button"
                className="p-2 w-100 my-4"
                title={"Sign Up"}
              />
              <NavLink className="w-100 text-center my-3" to={"/login"}>
                Login
              </NavLink>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
  let normalSignUp = (
    <>
      <Modal
        style={{ background: "var(--main-bg-color)" }}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="title">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="row d-flex w-100">
              <div className="col-4 h-100">
                <div className="avatar" />
                <button
                  style={{
                    backgroundColor: "rgba(243, 110, 33, 0.59)",
                    width: "166px",
                    fontSize: "12px",
                    fontWeight: "600",
                    padding: "6px 8px",
                    borderRadius: "6px",
                    margin: "8px",
                    zIndex: 2000,
                    position: "relative",
                  }}
                >
                  Upload Profile Picture
                </button>
              </div>
              <div className="col-4 h-100">
                <MyTextField type="text" name="username" label="Username" />
                <MyTextField type="text" name="phone" label="Phone Number" />
                <MyTextField
                  type="text"
                  name="walletAddress"
                  label="Wallet Address"
                />
                <Select
                  // displayEmpty
                  input={<OutlinedInput />}
                  // styles="input"
                  value={state.howDoYouKnowUs}
                  onChange={(e) => {
                    setState((prev) => ({
                      ...prev,
                      howDoYouKnowUs: e.target.value,
                    }));
                  }}
                  renderValue={(e) => {
                    console.log("e", e);
                    if (e.length === 0) {
                      return "How do you know us?";
                    }
                    return e;
                  }}
                  style={{
                    width: "90%",
                    borderColor: "white",
                    color: "white",
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>How do you know us?</em>
                  </MenuItem>
                  <MenuItem value="First Choice">
                    <em>First Choice</em>
                  </MenuItem>
                  <MenuItem value="Second Choice">
                    <em>Second Choice</em>
                  </MenuItem>
                  <MenuItem value="Third Choice">
                    <em>Third Choice</em>
                  </MenuItem>
                </Select>{" "}
              </div>
              <div className="col-4 h-100" style={{ textAlign: "right" }}>
                <MyTextField type="text" name="email" label="Email" />
                <MyTextField type="password" name="password" label="Password" />

                <MyTextField
                  type="text"
                  name="referalCode"
                  label="Referral Code"
                />
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <MyButton
                    type="button"
                    className="py-2 w-50 my-3"
                    title={"Sign Up"}
                  />
                  <NavLink className="w-100 text-center" to={"/login"}>
                    Login
                  </NavLink>
                </div>
              </div>
              <img className="sign-up-desktop-img" src={coin} alt="MMM Coin" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
  return isBigScreen ? normalSignUp : mobileSignUp;
}
