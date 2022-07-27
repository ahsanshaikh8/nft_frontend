import React from "react";
import BrandLogo from "./BrandLogo";
import welcomeImage from "../Images/image 1.png";
import MyTextField from "./MyTextField";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import Socials from "./Socials";
import Footer from "./Footer";
import { useState } from "react";
import server from "../apis/server";
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js'
export default function LoginPage() {
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handleLogin=async()=>{
    console.log(email)
    console.log(password)
    const {data} = await server.post(
      "users/login",
      {
   
        "email":email,
        "password":password
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
      if(data?.error)
      {
        toast.error(data?.error)
      }
      else
      {
      let userObj = CryptoJS.AES.encrypt(JSON.stringify(data.data), 'userObject').toString();
      localStorage.setItem('User', JSON.stringify(userObj));
      console.log(userObj)
      const User1 = JSON.parse(localStorage.getItem("User"))
      navigate("/my-assets")
      toast.success("Login Successfull")
    // const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    // const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    // console.log(userType)
      }
    }
  }
  return (
    <div className="login-page">
      <BrandLogo showOnMobile={true} />
      <img
        className="welcome-to-metaverse"
        alt="Welcome to Metaverse"
        src={welcomeImage}
      />
      <div className="login-form">
        <h2 className="my-4">Login</h2>
        <MyTextField label="Email" type="text" name="email" className="my-4" value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }}
         />
        <MyTextField type="password" name="password" label="Password" value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} />
        <MyButton type="button" className="my-4" title={"Login"} disabled={!(email && password)?true:false} onClick={handleLogin}/>
      </div>
      <Footer showSocials={false} />
    </div>
  );
}
