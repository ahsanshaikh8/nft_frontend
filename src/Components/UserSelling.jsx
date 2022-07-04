import React from "react";
import BrandLogo from "./BrandLogo";
import img from "../Images/thumbnail.png";
import MyButton from "./MyButton";
import UserNftCard from "./UserNftCard";
export default function UserSelling() {
  return (
    <div className="user-selling">
      <BrandLogo className="hide-on-mobile" />
      <h1 className="title w-100 my-4  px-0">MMM User - Selling</h1>
      <div className="user-selling-blurred d-flex flex-column">
        <img className="nft-img" src={img} alt="NFT Picture" />
        <MyButton className="buy-button" title={"Buy Now"}></MyButton>
        <UserNftCard />
      </div>
      <div className="user-selling-coins-img" />
    </div>
  );
}
