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
import server from "../apis/server"
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { setHasCancelledPopUp } from "../Helpers/storage";
import { Formik } from "formik"; 
import { useWallet, UseWalletProvider } from 'use-wallet'
import * as yup from "yup";
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
  const wallet=useWallet()
  const [state, setState] = useState({
    howDoYouKnowUs: "How do you know us?",
  });
 
  const isBigScreen = useMediaQuery({ query: "(min-width: 600px)" });
  let validationSchema = yup.object({ 
    username: yup.string().required('This field is required.'),
    phonenumber: yup.string().required('This field is required.'),
    email: yup.string().email('Invalid email').required('This field is required.'),
    password: yup.string().required('This field is required.'),
    walletaddress:yup.string().required('This field is required.')
   });  

  const handleClose = () => {
    
    console.log("close");
    setHasCancelledPopUp();
    closeModal();
  };
const handleSignup=async(values,resetForm)=>{
 
  try{
  const {data}=await server.post(
    "/users/createAccount",
    {
      "name":values?.username,
      "email":values?.email,
      "password":values?.password,
      "phoneNumber":values?.phonenumber,
       "walletAddress":wallet?.account,
      "role":"user"
  }
    ,
    { 
        headers: {
          "Content-Type": "application/json",
     },
      } 
)
if(data)
{
  console.log(data)
  if(data?.success)
  {
    toast.success("Signup Successfull")
  }
  else
  {
    toast.error(data?.error)
  }
}
}
catch(error)
{
  toast.error(error)
}
}



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
              <MyTextField type="text" name="username" label="Username"  />
              <MyTextField type="text" name="email" label="Email" />
              <MyTextField type="text" name="phone" label="Phone Number" />
              <MyTextField type="password" name="password" label="Password" />
              <MyTextField
                type="text"
                name="walletAddress"
                
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
        <Formik
        
            initialValues={{  email: "",password:"",username:"",phonenumber:"",walletaddress:wallet?.account }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>
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
                 <MyTextField type="text" name="username" label="Username"
                value={formikProps.values.username}
                onChange={formikProps.handleChange("username")}
                onBlur={formikProps.handleBlur("usename")}
                error={
                  formikProps.errors.username && formikProps.touched.username
                    ? true
                    : false
                }
                 /> 
                <MyTextField type="text" name="phone" label="Phone Number"
                value={formikProps.values.phonenumber}
                onChange={formikProps.handleChange("phonenumber")}
                onBlur={formikProps.handleBlur("phonenumber")}
                error={
                  formikProps.errors.phonenumber && formikProps.touched.phonenumber
                    ? true
                    : false
                }
                 /> 
                <MyTextField
                  type="text"
                  name="walletAddress"
                  label="Wallet Address"
                  value={formikProps.values.walletaddress}
                  onChange={formikProps.handleChange("walletaddress")}
                  onBlur={formikProps.handleBlur("walletaddress")}
                  error={
                    formikProps.errors.walletaddress && formikProps.touched.walletaddress
                      ? true
                      : false
                  }
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
                <MyTextField type="text" name="email" label="Email" 
                value={formikProps.values.email}
                onChange={formikProps.handleChange("email")}
                onBlur={formikProps.handleBlur("email")}
                error={
                  formikProps.errors.email && formikProps.touched.email
                    ? true
                    : false
                }
                />
                <MyTextField type="password" name="password" label="Password" 
                value={formikProps.values.password}
                onChange={formikProps.handleChange("password")}
                onBlur={formikProps.handleBlur("password")}
                error={
                  formikProps.errors.password && formikProps.touched.password
                    ? true
                    : false
                }
                />

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
                    onClick={formikProps?.handleSubmit}
                  />
                  <NavLink className="w-100 text-center" to={"/login"}>
                    Login
                  </NavLink>
                </div>
              </div>
              <img className="sign-up-desktop-img" src={coin} alt="MMM Coin" />
            </div>
          </div>
          </>
			   )}
			   </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
  return  isBigScreen ? normalSignUp : mobileSignUp;
}
