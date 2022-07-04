import React from "react";
import { NavLink } from "react-router-dom";
import strings from "../Helpers/strings";
import Socials from "./Socials";

export default function Footer({ showSocials }) {
  return (
    <footer>
      <NavLink className="link-block" to="/faq">
        FAQ
      </NavLink>
      <NavLink className="link-block" to="/road-map">
        {strings.roadmap.toUpperCase()}
      </NavLink>
      <NavLink className="link-block" to="/coming-soon">
        {strings.tokens.toUpperCase()}
      </NavLink>
      <NavLink className="link-block" to="/map-beta">
        MAP BETA
      </NavLink>
      <NavLink className="link-block" to="/privacy">
        PRIVACY POLICY
      </NavLink>
      {showSocials && <Socials />}
    </footer>
  );
}
