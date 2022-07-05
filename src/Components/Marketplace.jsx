import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import categories from "../Helpers/categories";
import { getHasCancelledPopUp } from "../Helpers/storage";
import strings from "../Helpers/strings";

import BrandLogo from "./BrandLogo";
import MetamaskListing from "./MetamaskListing";
import MetaMaskStatusCard from "./MetaMaskStatusCard";
export default function Marketplace() {
  const isActive=false
  
  const navigator = useNavigate();
  const [category, setCategory] = useState("cars");
  const [video, setVideo] = useState(require("../Images/cars.mp4"));
  const videoRef = useRef();
  useEffect(() => {
    if (isActive && !getHasCancelledPopUp()) {
      console.log("connected to metamask in marketplace");
      navigator("/login");
    }
  }, [isActive]);
  useEffect(() => {
    console.log(category);
    setVideo(require(`../Images/${category}.mp4`));
    videoRef.current.load()
  }, [category]);
  useEffect(() => {
    setVideo(require("../Images/cars.mp4"))
    videoRef.current.load()
  }, [])

  return (
    <div className="background-video">
      <div
        className="overlay"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.79)",
        }}
      >
        <video
          autoPlay={true}
          muted
          loop
          ref={videoRef} 
          // style={{
          //   top: 0,
          //   bottom: "90%",
          //   right: 0,
          //   left: 0,
          //   margin: "0",
          //   zIndex: 2000
          // }}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="market-place-header">
          <BrandLogo />
          <div className="market-place-header-text">
            {strings["market-place"]}
          </div>
          <div className="market-place-header-text-1">
            {strings["marketplace-subheader-1"]}
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search-box w-input"
              maxLength="256"
              name="Filter"
              placeholder="Search"
              id="Filter"
            />
          </div>
        </div>
        <div className="status-card-bg">
          <MetaMaskStatusCard />
        </div>
        <MetamaskListing />
        <footer>
          <NavLink className="link-block" to="/">
            {strings.home.toUpperCase()}
          </NavLink>
          {/* <NavLink className="link-block" to="/nft-store">
          {strings.store.toUpperCase()}
        </NavLink> */}
          <NavLink className="link-block" to="/my-assets">
            {strings["my-assets"].toUpperCase()}
          </NavLink>
          {/* <NavLink className="link-block" to="/my-assets">
          STACKING
        </NavLink> */}
          {categories.map((cat) => (
            <div
              style={{ color: "#F36E21", cursor: "pointer" }}
              className="link-block"
              onClick={(e) => {
                setCategory(cat.toLowerCase());
              }}
            >
              {cat.toUpperCase()}
            </div>
          ))}
          <NavLink className="link-block" to="/my-assets">
            {strings.stacking.toUpperCase()}
          </NavLink>
          <NavLink className="link-block" to="/submit-nft">
            {strings["submit-nft"].toUpperCase()}
          </NavLink>
          <NavLink className="link-block" to="/q-a">
            {strings["q-a"].toUpperCase()}
          </NavLink>
        </footer>
      </div>
    </div>
  );
}
