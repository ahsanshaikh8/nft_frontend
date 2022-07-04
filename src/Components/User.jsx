import React from "react";
import BrandLogo from "./BrandLogo";
import img from "../Images/thumbnail.png";
import NftStackingCard from "./NftStackingCard";
export default function User() {
  return (
    <div className="user">
      <BrandLogo />
      <div className="user-selling-coins-img" />
      <h1 className="title w-100 my-4  px-0">MMM User - Selling</h1>
      <div className="stack-card-wrapper">
        <img className="nft-stack-img" src={img} alt="NFT Picture" />
        <NftStackingCard />
      </div>
    </div>
  );
}
