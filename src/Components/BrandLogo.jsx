import React from "react";
import { NavLink } from "react-router-dom";
import constants from "../Helpers/constants.js";
import Logo from "../Images/logo.png";
export default function BrandLogo({ size, showOnMobile }) {
  return (
    <NavLink to={"/"}>
      <img
        width={size ? size : 254}
        className={`logo ${showOnMobile ? "" : "hide-on-mobile"}`}
        alt={constants.PROJECT_NAME + " logo"}
        src={Logo}
      />
    </NavLink>
  );
}
