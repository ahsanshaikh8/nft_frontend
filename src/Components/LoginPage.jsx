import React from "react";
import BrandLogo from "./BrandLogo";
import welcomeImage from "../Images/image 1.png";
import MyTextField from "./MyTextField";
import MyButton from "./MyButton";
import Socials from "./Socials";
import Footer from "./Footer";
export default function LoginPage() {
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
        <MyTextField label="Email" type="text" name="email" className="my-4" />
        <MyTextField type="password" name="password" label="Password" />
        <MyButton type="button" className="my-4" title={"Login"} />
      </div>
      <Footer showSocials={false} />
    </div>
  );
}
